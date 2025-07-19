import { useState } from "react";

const TopicForm = ({ onSubmit, loading }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit(topic);
    setTopic("");
  };

  return (
    <div className="flex items-start justify-center ">
      <form onSubmit={handleSubmit} className="flex align-middle w-5xl mt-16">
      <input
        type="text"
        placeholder="Enter a topic like 'Pythagorean Theorem'"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full max-w-3xl p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg transition duration-300"
        disabled={loading}
      />
      <button
        type="submit"
        className="ml-4 px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition duration-300 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
             <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-purple-500 rounded-full"></div>
            Generating...
          </div>
        ) : (
          "Generate"
        )}
      </button>
    </form>
    </div>
    
  );
};

export default TopicForm;