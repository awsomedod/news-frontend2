import { useState, useRef, useEffect } from "react";
import { Tab } from "@headlessui/react";
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

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-blue-600/10 p-2.5 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20">
              <LockClosedIcon className="h-full w-full text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account or create a new one
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
            {children}
          </div>
        </div>
      </div>
    </div>
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

export default function AuthSystem({ onAuthenticated }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <AuthLayout>
      <Tab.Group selectedIndex={activeIndex} onChange={setActiveIndex}>
        <Tab.List className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
          {["Login", "Sign Up"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500",
                  selected
                    ? "bg-white text-gray-900 shadow dark:bg-gray-900 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <LoginPanel onAuthenticated={onAuthenticated} onGoSignUp={() => setActiveIndex(1)} />
          </Tab.Panel>
          <Tab.Panel>
            <SignUpPanel onAuthenticated={onAuthenticated} onGoLogin={() => setActiveIndex(0)} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </AuthLayout>
  );
}

function LoginPanel({ onAuthenticated, onGoSignUp }) {
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
      const { user, token } = await (await import("../api/auth")).login({
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
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            or
          </span>
        </div>
      </div>
      <GoogleLogin onAuthenticated={onAuthenticated} />
    </form>
  );
}

function SignUpPanel({ onAuthenticated, onGoLogin }) {
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
      const api = await import("../api/auth");
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
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            or sign up with Google
          </span>
        </div>
      </div>

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

/**
 * Google Login button logic: obtains id_token, posts to /login/google, persists on success.
 */
function GoogleLogin({ onAuthenticated }) {
  const [err, setErr] = useState("");
  const [initialized, setInitialized] = useState(false);
  const containerId = "google-login-btn";

  async function mountButton() {
    setErr("");
    try {
      const { renderGoogleButton } = await import("../api/google");
      const el = document.getElementById(containerId);
      if (!el) return;
      await renderGoogleButton(
        el,
        { theme: "outline", size: "large", text: "signin_with" },
        async (id_token) => {
          try {
            const { loginWithGoogle } = await import("../api/auth");
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

/**
 * Google Signup button logic: validates username, checks availability, gets id_token, posts to /signup/google.
 */
function GoogleSignup({ username, setErrors, onAuthenticated }) {
  const [err, setErr] = useState("");
  const [initialized, setInitialized] = useState(false);
  const containerId = "google-signup-btn";

  // Proper synced ref for latest username to avoid stale closures
  const usernameRef = useRef(username);
  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  function validateUsernameLocal(u) {
    const candidate = (u || "").trim();
    const re = /^[A-Za-z0-9_]{3,30}$/;
    return re.test(candidate);
  }

  async function mountButton() {
    setErr("");
    try {
      const { renderGoogleButton } = await import("../api/google");
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
            if (!validateUsernameLocal(candidate)) {
              setErrors?.((prev) => ({ ...prev, username: "3–30 chars, alphanumeric and underscores only." }));
              return;
            }

            const api = await import("../api/auth");
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
