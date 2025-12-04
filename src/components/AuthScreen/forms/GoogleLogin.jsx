import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

/**
 * GoogleLogin button component: obtains id_token, posts to /login/google, persists on success.
 */
export function GoogleLogin({ onAuthenticated }) {
  const [err, setErr] = useState("");
  const [initialized, setInitialized] = useState(false);
  const containerId = "google-login-btn";

  async function mountButton() {
    setErr("");
    try {
      const { renderGoogleButton } = await import("../../../api/google");
      const el = document.getElementById(containerId);
      if (!el) return;
      await renderGoogleButton(
        el,
        { theme: "outline", size: "large", text: "signin_with" },
        async (id_token) => {
          try {
            const { loginWithGoogle } = await import("../../../api/auth");
            const { token, user } = await loginWithGoogle({ id_token });
            try {
              localStorage.setItem("auth_token", token);
              localStorage.setItem("auth_user", JSON.stringify(user));
            } catch {}
            onAuthenticated?.({ ...user, token });
          } catch (e) {
            setErr(e?.message || "Google login failed");
          }
        }
      );
      setInitialized(true);
    } catch (e) {
      setErr(e?.message || "Failed to initialize Google button");
    }
  }

  // Mount on first render
  if (!initialized) {
    // Delay to ensure the element is in DOM
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


