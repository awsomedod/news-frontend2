import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { TextField } from "../../../ui/TextField";
import { GoogleSignup } from "../GoogleSignup";

/**
 * GoogleSignupSection component for Google sign up with username field
 */
export function GoogleSignupSection({ onAuthenticated }) {
  const [googleUsername, setGoogleUsername] = useState("");
  const [googleErrors, setGoogleErrors] = useState({});

  return (
    <div className="space-y-3">
      <TextField
        id="google_username"
        label="Username (for Google sign up)"
        value={googleUsername}
        onChange={(e) => {
          setGoogleUsername(e.target.value);
          setGoogleErrors((prev) => ({ ...prev, username: undefined }));
        }}
        placeholder="your_username"
        error={googleErrors.username}
        icon={<UserCircleIcon className="h-5 w-5" />}
        autoComplete="username"
      />
      <GoogleSignup
        username={googleUsername}
        setErrors={setGoogleErrors}
        onAuthenticated={onAuthenticated}
      />
    </div>
  );
}
