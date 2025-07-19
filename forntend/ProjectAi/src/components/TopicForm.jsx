import { useState } from "react";

const TopicForm = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex align-middle p-4 gap-2">
      <input
        type="text"
        placeholder="Enter a topic like 'Pythagorean Theorem'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="text-white rounded px-3 py-2 w-full border-4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate
      </button>
    </form>
  );
};

export default TopicForm;
