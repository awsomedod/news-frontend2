import { useState } from "react";
import {
  AtSymbolIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { TextField } from "../../../ui/TextField";
import { PrimaryButton } from "../../../ui/PrimaryButton";
import { OrDivider } from "../../../ui/OrDivider";
import { GoogleSignup } from "../GoogleSignup";
import { validateEmail, validateUsername } from "../../../../utils/validation";

/**
 * SignUpForm component for user registration
 */
export function SignUpForm({ onAuthenticated, onGoLogin }) {
  // Email/password state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Google-signup-only username
  const [googleUsername, setGoogleUsername] = useState("");
  const [googleErrors, setGoogleErrors] = useState({});

  function validateEmailPassword() {
    const next = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!validateEmail(email)) next.email = "Enter a valid email address.";
    if (!username.trim()) next.username = "Username is required.";
    else if (!validateUsername(username)) next.username = "3–30 chars, alphanumeric and underscores only. 2222";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (!confirm) next.confirm = "Confirm your password.";
    else if (confirm !== password) next.confirm = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmailPassword()) return;
    setLoading(true);
    try {
      const api = await import("../../../../api/auth");
      const { user } = await api.register({
        email,
        username,
        password,
      });
      const identifier = username || email;
      const loginRes = await api.login({ identifier, password });
      try {
        localStorage.setItem("auth_token", loginRes.token);
        localStorage.setItem("auth_user", JSON.stringify(loginRes.user));
      } catch {}
      onAuthenticated?.({ ...loginRes.user, token: loginRes.token });
    } catch (err) {
      const message = err?.message || "Registration failed";
      const next = {};
      if (err?.status === 409) {
        if ((err.data?.error || "").toLowerCase().includes("username")) next.username = "Username already taken";
        if ((err.data?.error || "").toLowerCase().includes("email")) next.email = "Email already registered";
      } else if (err?.status === 400) {
        next.password = message;
      } else {
        next.password = message;
      }
      setErrors(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Email/password registration form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
          icon={<AtSymbolIcon className="h-5 w-5" />}
          autoComplete="email"
        />
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your_username"
          error={errors.username}
          icon={<UserCircleIcon className="h-5 w-5" />}
          autoComplete="username"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="password"
            label="Password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={errors.password}
            icon={<LockClosedIcon className="h-5 w-5" />}
            rightIcon={showPw ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            onRightIconClick={() => setShowPw((s) => !s)}
            autoComplete="new-password"
          />
          <TextField
            id="confirm"
            label="Confirm password"
            type={showPw2 ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            error={errors.confirm}
            icon={<LockClosedIcon className="h-5 w-5" />}
            rightIcon={showPw2 ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            onRightIconClick={() => setShowPw2((s) => !s)}
            autoComplete="new-password"
          />
        </div>
        <PrimaryButton type="submit" loading={loading}>
          Create account
          <ArrowRightIcon className="h-4 w-4" />
        </PrimaryButton>
      </form>

      {/* Divider */}
      <OrDivider text="or sign up with Google" />

      {/* Google sign-up section with its own username field */}
      <div className="space-y-3">
        <TextField
          id="google_username"
          label="Username (for Google sign up)"
          value={googleUsername}
          onChange={(e) => {
            const v = e.target.value;
            setGoogleUsername(v);
            // clear inline error as the user types
            setGoogleErrors((prev) => ({ ...prev, username: undefined }));
          }}
          placeholder="your_username"
          error={googleErrors.username}
          icon={<UserCircleIcon className="h-5 w-5" />}
          autoComplete="username"
        />
        <GoogleSignup username={googleUsername} setErrors={setGoogleErrors} onAuthenticated={onAuthenticated} />
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <button type="button" onClick={onGoLogin} className="link-primary">
          Log in
        </button>
      </div>
    </div>
  );
}


