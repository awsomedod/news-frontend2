import { useState, useRef, useEffect } from "react";
import { validateUsername } from "../../../../utils/validation";

/**
 * Custom hook for Google signup button logic
 */
export function useGoogleSignup(username, setErrors, onAuthenticated, containerId) {
  const [err, setErr] = useState("");
  const [initialized, setInitialized] = useState(false);
  const usernameRef = useRef(username);
  
  useEffect(() => { usernameRef.current = username; }, [username]);

  async function mountButton() {
    setErr("");
    try {
      const { renderGoogleButton } = await import("../../../../api/google");
      const el = document.getElementById(containerId);
      if (!el) return;

      await renderGoogleButton(el, { theme: "outline", size: "large", text: "signup_with" }, async (id_token) => {
        try {
          const candidate = (usernameRef.current || "").trim();
          setErrors?.((prev) => ({ ...prev, username: undefined }));
          if (!candidate) { setErrors?.((prev) => ({ ...prev, username: "Username is required" })); return; }
          if (!validateUsername(candidate)) { setErrors?.((prev) => ({ ...prev, username: "3–30 chars, alphanumeric and underscores only." })); return; }

          const api = await import("../../../../api/auth");
          const avail = await api.checkUsername(candidate);
          if (!avail?.available) { setErrors?.((prev) => ({ ...prev, username: "Username is already taken" })); return; }

          const { token, user } = await api.signupWithGoogle({ id_token, username: candidate });
          try { localStorage.setItem("auth_token", token); localStorage.setItem("auth_user", JSON.stringify(user)); } catch {}
          onAuthenticated?.({ ...user, token });
        } catch (e) {
          const message = e?.message || "Google signup failed";
          if (e?.status === 409) {
            if ((e.data?.error || "").toLowerCase().includes("username")) setErrors?.((prev) => ({ ...prev, username: "Username already taken" }));
            else if ((e.data?.error || "").toLowerCase().includes("email")) setErr("Email already registered. Try Google login instead.");
            else setErr(message);
          } else setErr(message);
        }
      });
      setInitialized(true);
    } catch (e) { setErr(e?.message || "Failed to initialize Google button"); }
  }

  return { err, initialized, mountButton };
}

