/**
 * LoginFormActions component for login form action links
 */
export function LoginFormActions({ onGoSignUp }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Create an account?{" "}
        <button
          type="button"
          onClick={onGoSignUp}
          className="link-primary ml-1"
        >
          Sign up
        </button>
      </span>
      <button
        type="button"
        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Forgot password?
      </button>
    </div>
  );
}
