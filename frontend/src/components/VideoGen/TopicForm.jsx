import { useState } from "react";

const TopicForm = ({ onSubmitVideo, onSubmitDescription, loading }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmitDescription(prompt);
    onSubmitVideo(prompt);
    setPrompt("");
  };

  return (
    <div className="flex items-start justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 w-full max-w-4xl px-6"
      >
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <input
            type="text"
            placeholder="Enter a topic like 'Pythagorean Theorem' or 'Quantum Physics'..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="relative w-full p-6 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-2xl transition-all duration-300 text-lg font-medium"
            disabled={loading}
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        <button
          type="submit"
          className="cursor-pointer hover:text-black relative px-8 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg min-w-[140px] group overflow-hidden"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center gap-3">
            {loading ? (
              <div>
                <div className="animate-spin h-6 w-6 border-2 border-white/30 border-t-white rounded-full"></div>
                <span className="animate-pulse">Generating...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <p>Generate</p>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default TopicForm;
