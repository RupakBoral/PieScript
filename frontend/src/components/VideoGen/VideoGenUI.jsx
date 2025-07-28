import { useState } from "react";
import React from "react";
import TopicForm from "./TopicForm";
import Description from "./Description";
import VideoPlayer from "./VideoPlayer";
import starVideo from "../../assets/star.mp4";

const VideoGenUI = () => {
  const [description, setDescription] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTopicSubmit = async (prompt) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8888/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from backend");
      }

      const data = await res.json();
      setDescription(data?.description);
      setVideoUrl(data?.secure_url);
    } catch (error) {
      setTimeout(() => {
        setDescription("Error: " + error.message);
      }, 3000);
      setVideoUrl("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <div className="flex-grow relative z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
        >
          <source src={starVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <h1 className="text-white text-4xl font-semibold text-center my-8">
            🎥 PieScript
          </h1>
          <TopicForm onSubmit={handleTopicSubmit} loading={loading} />
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-purple-500 rounded-full"></div>
            </div>
          )}
          {description !== null && <Description text={description} />}
          {!loading && videoUrl !== null && <VideoPlayer videoUrl={videoUrl} />}
        </div>
      </div>
    </div>
  );
};

export default VideoGenUI;
