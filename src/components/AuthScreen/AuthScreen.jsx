import { useState } from "react";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
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
      <TabGroup selectedIndex={activeIndex} onChange={setActiveIndex}>
        <AuthTabList />
        <TabPanels className="mt-6">
          <TabPanel>
            <LoginForm
              onAuthenticated={onAuthenticated}
              onGoSignUp={() => setActiveIndex(1)}
            />
          </TabPanel>
          <TabPanel>
            <SignUpForm
              onAuthenticated={onAuthenticated}
              onGoLogin={() => setActiveIndex(0)}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </AuthLayout>
  );
}
