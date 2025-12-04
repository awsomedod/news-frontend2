import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SignUpFormFields } from "./SignUpFormFields";
import { validateEmail, validateUsername } from "../../utils/validation";

export default function SignUp({ onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!validateEmail(email)) next.email = "Enter a valid email address.";
    if (!username.trim()) next.username = "Username is required.";
    else if (!validateUsername(username)) next.username = "3–30 chars, alphanumeric and underscores only.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (!confirm) next.confirm = "Confirm your password.";
    else if (confirm !== password) next.confirm = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      onAuthenticated?.({ id: "2", name: username, email, username });
      setLoading(false);
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <SignUpFormFields email={email} setEmail={setEmail} username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} confirm={confirm} setConfirm={setConfirm}
        showPw={showPw} setShowPw={setShowPw} showPw2={showPw2} setShowPw2={setShowPw2} errors={errors} />
      <p className="text-xs text-gray-500 dark:text-gray-400">By continuing you agree to our Terms and Privacy Policy.</p>
      <PrimaryButton type="submit" loading={loading}>Create account<ArrowRightIcon className="h-4 w-4" /></PrimaryButton>
    </form>
  );
}

