import { useState } from "react";

const TopicForm = ({ onSubmit }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit(topic);
    setTopic("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex align-middle p-4 gap-2">
      <input
        type="text"
        placeholder="Enter a topic like 'Pythagorean Theorem'"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="text-white border rounded px-3 py-2 w-full border-4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Generate
      </button>
    </form>
  );
};

export default TopicForm;
