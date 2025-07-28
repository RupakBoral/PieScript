import { useState } from "react";

// --- SVG Icons for a cleaner UI ---

const GenerateIcon = ({ loading }) => (
  <>
    {loading ? (
      <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    )}
  </>
);

const VoiceIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 7.5v-1.5a6 6 0 0 0-6-6.75v-1.5a6.75 6.75 0 0 0-6.75 6.75v1.5a6 6 0 0 0 6 6.75v-1.5Z"
      />
    </svg>
  );

const DebugIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
);


// --- Refactored Component ---

const TopicForm = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSubmit(prompt);
    setPrompt("");
  };
  
  // Note: The second button was changed to type="button" to prevent form submission
  const handleVoiceAction = () => {
    if (loading) return;
    alert("Voice changing action triggered! 🎙️");
  };

  const handleDebugAction = () => {
    if (loading) return;
    alert("Debugging action triggered! 🐞");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl px-4 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full items-center p-2 bg-slate-100 dark:bg-slate-800 rounded-full shadow-lg"
        >
          <textarea
            rows="1"
            placeholder="Enter a topic..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                  handleSubmit(e);
              }
            }}
            className="flex-grow bg-transparent p-2 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none resize-none"
            disabled={loading}
          />
          <div className="flex items-center gap-2 pr-1">
            {/* Voice Button */}
            <button
              type="button"
              onClick={handleVoiceAction}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50"
              disabled={loading}
            >
              <VoiceIcon />
            </button>
            {/* Debug Button */}
            <button
              type="button"
              onClick={handleDebugAction}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50"
              disabled={loading}
            >
              <DebugIcon />
            </button>
            {/* Submit Button */}
            <button
              type="submit"
              className="p-2 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-black hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:scale-100"
              disabled={loading || !prompt.trim()}
            >
              <GenerateIcon loading={loading} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicForm;