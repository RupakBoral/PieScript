import { useState } from "react";
import React from "react";
import TopicForm from "./components/TopicForm";
import Description from "./components/Description";
import VideoPlayer from "./components/VideoPlayer";
import starVideo from "./assets/star.mp4";

function App() {
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false); // 👈 New loading state

  const handleTopicSubmit = async (topic) => {
    setLoading(true); // ⏳ Start loading

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
      setVideoUrl(data.videoUrl); // Example: blob URL or hosted MP4
    } catch (error) {
      setDescription("Error: " + error.message);
      setVideoUrl("");
    }

    setLoading(false); // ✅ Stop loading
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <div className="flex-grow relative z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
        >
          <source src={starVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <h1 className="text-white text-3xl font-bold text-center mb-6">🎥 Manim AI Explainer</h1>
          <TopicForm onSubmit={handleTopicSubmit} loading={loading} />
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-purple-500 rounded-full"></div>
            </div>
          )}
          {description && <Description text={description} />}
          {!loading && videoUrl && <VideoPlayer videoUrl={videoUrl} />}
        </div>
      </div>
      <footer className="bg-gray-700 flex flex-col items-center  align-bottom h-14 justify-center">
        <p className="text-white font-bold font-sans align-middle">Made by OG Dev's Rupak Boral && Parshant Vardhan :)</p>
      </footer>   
    </div>
  );
}

export default App;
