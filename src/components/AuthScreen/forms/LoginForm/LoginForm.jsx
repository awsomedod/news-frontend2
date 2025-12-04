import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "../../../ui/PrimaryButton";
import { OrDivider } from "../../../ui/OrDivider";
import { GoogleLogin } from "../GoogleLogin";
import { LoginFormFields } from "./LoginFormFields";
import { LoginFormActions } from "./LoginFormActions";
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
    if (!identifier.trim()) next.identifier = "Email or username is required.";
    else if (identifier.includes("@") && !validateEmail(identifier)) next.identifier = "Enter a valid email address.";
    else if (!identifier.includes("@") && !validateUsername(identifier)) next.identifier = "Username must be 3-30 chars, alphanumeric and underscores.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { user, token } = await (await import("../../../../api/auth")).login({ identifier, password });
      try { localStorage.setItem("auth_token", token); localStorage.setItem("auth_user", JSON.stringify(user)); } catch {}
      onAuthenticated?.({ ...user, token });
    } catch (err) {
      const msg = err?.message || "Login failed";
      setErrors((prev) => ({ ...prev, password: msg.includes("credentials") ? "Invalid credentials" : msg }));
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <LoginFormFields identifier={identifier} setIdentifier={setIdentifier} password={password} setPassword={setPassword} showPw={showPw} setShowPw={setShowPw} errors={errors} />
      <LoginFormActions onGoSignUp={onGoSignUp} />
      <PrimaryButton type="submit" loading={loading}>Sign in<ArrowRightIcon className="h-4 w-4" /></PrimaryButton>
      <OrDivider />
      <GoogleLogin onAuthenticated={onAuthenticated} />
    </form>
  );
}
