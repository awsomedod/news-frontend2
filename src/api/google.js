/**
 * Small helper to get a Google ID token using Google Identity Services (GIS).
 * Requires VITE_GOOGLE_CLIENT_ID to be set in your environment.
 *
 * Usage:
 *   const idToken = await getGoogleIdToken();
 *   // send idToken to backend /login/google or /signup/google
 */

const GIS_SRC = "https://accounts.google.com/gsi/client";

let gisLoaded = false;
let loadingPromise = null;

function loadGisScript() {
  if (gisLoaded) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      gisLoaded = true;
      resolve();
    };
    script.onerror = () =>
      reject(new Error("Failed to load Google Identity Services script"));
    document.head.appendChild(script);
  });

  return loadingPromise;
}

/**
 * Prompts the user to sign in with Google and returns the ID token (JWT).
 * This uses google.accounts.id to get an ID token via the "One Tap" / prompt flow.
 * If you want a rendered button, you can alternatively use renderButton + prompt.
 */
export async function getGoogleIdToken() {
  const clientId =
    "802693362877-2ad452kd7mmm9jlgje6aigfunsb3065g.apps.googleusercontent.com";
  if (!clientId) {
    throw new Error(
      "Missing VITE_GOOGLE_CLIENT_ID. Set it in your environment."
    );
  }

  await loadGisScript();

  return new Promise((resolve, reject) => {
    /* global google */
    if (!window.google || !google.accounts || !google.accounts.id) {
      reject(new Error("Google Identity Services not available"));
      return;
    }

    let resolved = false;

    try {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          // response.credential is the ID token
          const idToken = response?.credential;
          if (idToken) {
            resolved = true;
            resolve(idToken);
          } else {
            reject(new Error("No Google ID token received"));
          }
        },
      });

      // Display prompt; if the user dismisses, we reject.
      google.accounts.id.prompt((notification) => {
        if (resolved) return;
        const reason =
          (typeof notification.getNotDisplayedReason === "function" &&
            notification.getNotDisplayedReason()) ||
          (typeof notification.getSkippedReason === "function" &&
            notification.getSkippedReason()) ||
          "dismissed";
        reject(new Error(`Google Sign-In was not completed: ${reason}`));
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Render the official Google Sign-In button into a container element.
 * onCredential will be called with the id_token when the user completes sign-in.
 *
 * Example:
 *   renderGoogleButton(containerEl, { theme: "outline", size: "large" }, (idToken) => { ... });
 */
export async function renderGoogleButton(
  containerEl,
  options = {},
  onCredential
) {
  const clientId =
    "802693362877-2ad452kd7mmm9jlgje6aigfunsb3065g.apps.googleusercontent.com";
  if (!clientId) {
    throw new Error(
      "Missing VITE_GOOGLE_CLIENT_ID. Set it in your environment."
    );
  }
  if (!containerEl) {
    throw new Error("Container element is required to render Google button.");
  }

  await loadGisScript();

  if (!window.google || !google.accounts || !google.accounts.id) {
    throw new Error("Google Identity Services not available");
  }

  // Initialize with callback that receives the ID token
  google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      const idToken = response?.credential;
      if (idToken && typeof onCredential === "function") {
        onCredential(idToken);
      }
    },
  });

  // Clear container then render the official button
  containerEl.innerHTML = "";

  const defaultOptions = {
    type: "standard", // icon | standard
    theme: "outline", // outline | filled_blue | filled_black
    size: "large", // small | medium | large
    text: "signin_with", // signin_with | signup_with | continue_with | signIn
    shape: "rectangular", // rectangular | pill | circle | square
    logo_alignment: "left",
  };

  const renderOptions = { ...defaultOptions, ...(options || {}) };
  try {
    google.accounts.id.renderButton(containerEl, renderOptions);
  } catch (e) {
    throw new Error(
      `Failed to render Google Sign-In button, Error: ${e.message}`
    );
  }
}
