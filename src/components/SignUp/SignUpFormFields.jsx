import {
  AtSymbolIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { TextField } from "../ui/TextField";

/**
 * SignUpFormFields component for sign up form inputs
 */
export function SignUpFormFields({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirm,
  setConfirm,
  showPw,
  setShowPw,
  showPw2,
  setShowPw2,
  errors,
}) {
  return (
    <>
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
          rightIcon={
            showPw ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )
          }
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
          rightIcon={
            showPw2 ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )
          }
          onRightIconClick={() => setShowPw2((s) => !s)}
          autoComplete="new-password"
        />
      </div>
    </>
  );
}
