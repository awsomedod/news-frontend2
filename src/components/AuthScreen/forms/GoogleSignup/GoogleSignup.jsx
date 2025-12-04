import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useGoogleSignup } from "./useGoogleSignup";

/**
 * GoogleSignup button component
 */
export function GoogleSignup({ username, setErrors, onAuthenticated }) {
  const containerId = "google-signup-btn";
  const { err, initialized, mountButton } = useGoogleSignup(
    username,
    setErrors,
    onAuthenticated,
    containerId
  );

  if (!initialized) setTimeout(mountButton, 0);

  return (
    <div className="space-y-2">
      <div id={containerId} className="w-full flex justify-center" />
      {err && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <ExclamationCircleIcon className="h-4 w-4" />
          {err}
        </p>
      )}
    </div>
  );
}
