import { useState, useRef, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { validateUsername } from "../../../utils/validation";

/**
 * GoogleSignup button component: validates username, checks availability, gets id_token, posts to /signup/google.
 */
export function GoogleSignup({ username, setErrors, onAuthenticated }) {
  const [err, setErr] = useState("");
  const [initialized, setInitialized] = useState(false);
  const containerId = "google-signup-btn";

  // Proper synced ref for latest username to avoid stale closures
  const usernameRef = useRef(username);
  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  async function mountButton() {
    setErr("");
    try {
      const { renderGoogleButton } = await import("../../../api/google");
      const el = document.getElementById(containerId);
      if (!el) return;

      await renderGoogleButton(
        el,
        { theme: "outline", size: "large", text: "signup_with" },
        async (id_token) => {
          try {
            // Always read the latest value from ref to avoid stale closures
            const latest = usernameRef.current;
            // use trimmed candidate for all checks/calls
            const candidate = (latest || "").trim();

            // clear inline error first
            setErrors?.((prev) => ({ ...prev, username: undefined }));

            if (!candidate) {
              setErrors?.((prev) => ({ ...prev, username: "Username is required" }));
              return;
            }
            if (!validateUsername(candidate)) {
              setErrors?.((prev) => ({ ...prev, username: "3–30 chars, alphanumeric and underscores only." }));
              return;
            }

            const api = await import("../../../api/auth");
            // Pre-check availability
            const avail = await api.checkUsername(candidate);
            if (!avail?.available) {
              setErrors?.((prev) => ({ ...prev, username: "Username is already taken" }));
              return;
            }

            const { token, user } = await api.signupWithGoogle({ id_token, username: candidate });
            try {
              localStorage.setItem("auth_token", token);
              localStorage.setItem("auth_user", JSON.stringify(user));
            } catch {}
            onAuthenticated?.({ ...user, token });
          } catch (e) {
            const message = e?.message || "Google signup failed";
            if (e?.status === 409) {
              if ((e.data?.error || "").toLowerCase().includes("username")) {
                setErrors?.((prev) => ({ ...prev, username: "Username already taken" }));
              } else if ((e.data?.error || "").toLowerCase().includes("email")) {
                setErr("Email already registered. Try Google login instead.");
              } else {
                setErr(message);
              }
            } else {
              setErr(message);
            }
          }
        }
      );

      setInitialized(true);
    } catch (e) {
      setErr(e?.message || "Failed to initialize Google button");
    }
  }

  if (!initialized) {
    setTimeout(mountButton, 0);
  }

  return (
    <div className="space-y-2">
      <div id={containerId} className="w-full flex justify-center" />
      {err ? (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <ExclamationCircleIcon className="h-4 w-4" />
          {err}
        </p>
      ) : null}
    </div>
  );
}


