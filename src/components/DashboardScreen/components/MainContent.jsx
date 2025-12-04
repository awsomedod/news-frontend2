import { Card } from "../../ui/Card";
import { Sources } from "../../Sources";
import { SummaryRuns } from "../../SummaryRuns";
import { RefreshNewsButton } from "../../ui/RefreshNewsButton";
import { WelcomeSection } from "./WelcomeSection";

/**
 * MainContent component - Main dashboard content area
 */
export function MainContent({
  user,
  userData,
  userDataLoading,
  userDataError,
  sourcesUpdating,
  updateSources,
  fetchUserData,
  handleNewsGenerated,
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <WelcomeSection user={user} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card title="News Sources">
            {userDataLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Loading...</span>
              </div>
            ) : (
              <Sources 
                sources={userData?.sources} 
                onSourcesUpdate={updateSources}
                isUpdating={sourcesUpdating}
              />
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card 
            title="Summary Runs"
            action={
              <RefreshNewsButton
                sources={userData?.sources || []}
                onNewsGenerated={handleNewsGenerated}
                disabled={userDataLoading || !userData}
              />
            }
          >
            {userDataLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Loading summary runs...</span>
              </div>
            ) : userDataError ? (
              <div className="py-8 text-center">
                <p className="text-sm text-red-600 dark:text-red-400">Error: {userDataError}</p>
                <button 
                  onClick={fetchUserData}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Retry
                </button>
              </div>
            ) : userData ? (
              <SummaryRuns summaryRuns={userData.summary_runs} />
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No user data available</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}


