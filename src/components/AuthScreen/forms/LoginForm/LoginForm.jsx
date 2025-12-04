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
import { GoogleLogin } from "../GoogleLogin";
import { validateEmail, validateUsername } from "../../../../utils/validation";

/**
 * LoginForm component for user authentication
 */
export function LoginForm({ onAuthenticated, onGoSignUp }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!identifier.trim()) {
      next.identifier = "Email or username is required.";
    } else if (identifier.includes("@")) {
      if (!validateEmail(identifier)) {
        next.identifier = "Enter a valid email address.";
      }
    } else {
      if (!validateUsername(identifier)) {
        next.identifier = "Username must be 3-30 chars, alphanumeric and underscores.";
      }
    }
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { user, token } = await (await import("../../../../api/auth")).login({
        identifier,
        password,
      });
      // Persist token + user for session restoration
      try {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      } catch {}
      onAuthenticated?.({ ...user, token });
    } catch (err) {
      const msg = err?.message || "Login failed";
      setErrors((prev) => ({ ...prev, identifier: undefined, password: msg.includes("credentials") ? "Invalid credentials" : msg }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField
        id="identifier"
        label="Email or Username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="you@example.com or user_name"
        error={errors.identifier}
        icon={identifier.includes("@") ? <AtSymbolIcon className="h-5 w-5" /> : <UserCircleIcon className="h-5 w-5" />}
        autoComplete="username"
      />
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
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Create an account?
          {" "}
          <button type="button" onClick={onGoSignUp} className="link-primary ml-1">
            Sign up
          </button>
        </span>
        <button type="button" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Forgot password?
        </button>
      </div>
      <PrimaryButton type="submit" loading={loading}>
        Sign in
        <ArrowRightIcon className="h-4 w-4" />
      </PrimaryButton>
      <OrDivider />
      <GoogleLogin onAuthenticated={onAuthenticated} />
    </form>
  );
}


