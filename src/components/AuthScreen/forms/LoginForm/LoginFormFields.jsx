import { AtSymbolIcon, UserCircleIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { TextField } from "../../../ui/TextField";

/**
 * LoginFormFields component for identifier and password inputs
 */
export function LoginFormFields({ identifier, setIdentifier, password, setPassword, showPw, setShowPw, errors }) {
  return (
    <>
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
    </>
  );
}

