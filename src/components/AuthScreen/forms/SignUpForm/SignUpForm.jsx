import { OrDivider } from "../../../ui/OrDivider";
import { EmailPasswordForm } from "./EmailPasswordForm";
import { GoogleSignupSection } from "./GoogleSignupSection";

/**
 * SignUpForm component for user registration
 */
export function SignUpForm({ onAuthenticated, onGoLogin }) {
  return (
    <div className="space-y-5">
      <EmailPasswordForm onAuthenticated={onAuthenticated} />
      <OrDivider text="or sign up with Google" />
      <GoogleSignupSection onAuthenticated={onAuthenticated} />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <button type="button" onClick={onGoLogin} className="link-primary">
          Log in
        </button>
      </div>
    </div>
  );
}
