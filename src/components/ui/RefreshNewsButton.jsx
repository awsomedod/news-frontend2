import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { NEWS_SERVICE_URL } from "../../api/news_service";

/**
 * RefreshNewsButton component for generating new news summaries
 */
export function RefreshNewsButton({ sources = [], onNewsGenerated, disabled = false }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generateNews = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Extract just the URLs from sources
      const sourceUrls = sources.map(source => source.url).filter(Boolean);
      
      if (sourceUrls.length === 0) {
        throw new Error('No sources available. Please add sources first.');
      }

      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${NEWS_SERVICE_URL}/generate-news`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sources: sourceUrls }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to generate news: ${response.status}`);
      }

      const responseData = await response.json();
      
      // Call the callback to refresh user data or handle the new summaries
      if (onNewsGenerated) {
        onNewsGenerated(responseData);
      }

    } catch (error) {
      console.error('Error generating news:', error);
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={generateNews}
        disabled={disabled || isGenerating || sources.length === 0}
        className={`
          inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
          ${
            disabled || isGenerating || sources.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 transform hover:scale-105 active:scale-95'
          }
        `}
      >
        <ArrowPathIcon 
          className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} 
        />
        {isGenerating ? 'Generating News...' : 'Refresh News'}
      </button>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {sources.length === 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Add sources to generate news summaries
        </div>
      )}
    </div>
  );
}
