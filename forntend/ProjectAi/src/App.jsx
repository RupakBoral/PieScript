import { useState } from "react";
import React from "react";
import TopicForm from "./components/TopicForm";
import Description from "./components/Description";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleTopicSubmit = async (topic) => {
    // 🔥 API CALL TO BACKEND HERE 🔥
    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from backend");
      }

      const data = await res.json();
      setDescription(data.description);
      setVideoUrl(data.videoUrl); // MP4 URL or blob
    } catch (error) {
      setDescription("Error: " + error.message);
      setVideoUrl("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <h1 className="text-white text-3xl font-bold text-center mb-6">🎥 Manim AI Explainer</h1>
      <TopicForm onSubmit={handleTopicSubmit} />
      {description && <Description text={description} />}
      {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
    </div>
  );
}

export default App;
