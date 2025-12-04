import { useState } from "react";
import {
  AtSymbolIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { TextField } from "./ui/TextField";
import { PrimaryButton } from "./ui/PrimaryButton";
import { validateEmail, validateUsername } from "../utils/validation";

export default function Login({ onAuthenticated }) {
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
      if (!validateEmail(identifier))
        next.identifier = "Enter a valid email address.";
    } else {
      if (!validateUsername(identifier))
        next.identifier =
          "Username must be 3-30 chars, alphanumeric and underscores.";
    }
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const mockUser = identifier.includes("@")
        ? { id: "1", name: "New User", email: identifier, username: "user_1" }
        : {
            id: "1",
            name: "New User",
            email: "user@example.com",
            username: identifier,
          };
      onAuthenticated?.(mockUser);
      setLoading(false);
    }, 900);
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
        icon={
          identifier.includes("@") ? (
            <AtSymbolIcon className="h-5 w-5" />
          ) : (
            <UserCircleIcon className="h-5 w-5" />
          )
        }
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
        rightIcon={
          showPw ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )
        }
        onRightIconClick={() => setShowPw((s) => !s)}
        autoComplete="current-password"
      />
      <PrimaryButton type="submit" loading={loading}>
        Sign in
        <ArrowRightIcon className="h-4 w-4" />
      </PrimaryButton>
    </form>
  );
}
