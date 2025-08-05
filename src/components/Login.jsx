import { useState } from "react";
import {
  AtSymbolIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  rightIcon,
  onRightIconClick,
  autoComplete,
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div
        className={classNames(
          "relative rounded-lg border bg-white dark:bg-gray-800",
          error ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-700",
          "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        )}
      >
        {icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </div>
        ) : null}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={classNames(
            "block w-full rounded-lg bg-transparent",
            "py-2.5 pr-10",
            icon ? "pl-10" : "pl-3",
            "text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm",
            "dark:text-gray-100 dark:placeholder:text-gray-500"
          )}
        />
        {rightIcon ? (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
          <ExclamationCircleIcon className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryButton({ children, loading, className = "", ...props }) {
  return (
    <button
      className={classNames(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm",
        "hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70",
        "transition-colors duration-200",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {children}
      {loading ? (
        <svg
          aria-hidden="true"
          className="ml-2 h-4 w-4 animate-spin text-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
            className="opacity-20"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 2.22507 56.8611 1.98729C54.3888 1.9153 52.9077 4.37127 53.5448 6.79673C54.1819 9.2222 56.6731 10.6916 59.031 11.546C63.9518 13.4801 68.3609 16.2449 72.0016 19.9106C75.6423 23.5762 78.3507 28.0425 80.0066 33.2539C80.6817 35.6757 83.5422 36.6109 85.3023 36.3328C88.737 35.8445 91.542 36.1497 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
      ) : null}
    </button>
  );
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function validateUsername(username) {
  const re = /^[A-Za-z0-9_]{3,30}$/;
  return re.test(username);
}

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
      if (!validateEmail(identifier)) next.identifier = "Enter a valid email address.";
    } else {
      if (!validateUsername(identifier)) next.identifier = "Username must be 3-30 chars, alphanumeric and underscores.";
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
        : { id: "1", name: "New User", email: "user@example.com", username: identifier };
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
      <PrimaryButton type="submit" loading={loading}>
        Sign in
        <ArrowRightIcon className="h-4 w-4" />
      </PrimaryButton>
    </form>
  );
}
