import { useState } from "react";
import { Tab } from "@headlessui/react";
import { AuthLayout } from "./components/AuthLayout";
import { AuthTabList } from "./components/AuthTabList";
import { LoginForm } from "./forms/LoginForm/LoginForm";
import { SignUpForm } from "./forms/SignUpForm/SignUpForm";

/**
 * AuthScreen component - Main authentication screen with tabbed Login/SignUp
 */
export default function AuthScreen({ onAuthenticated }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <AuthLayout>
      <Tab.Group selectedIndex={activeIndex} onChange={setActiveIndex}>
        <AuthTabList />
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <LoginForm onAuthenticated={onAuthenticated} onGoSignUp={() => setActiveIndex(1)} />
          </Tab.Panel>
          <Tab.Panel>
            <SignUpForm onAuthenticated={onAuthenticated} onGoLogin={() => setActiveIndex(0)} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </AuthLayout>
  );
}


