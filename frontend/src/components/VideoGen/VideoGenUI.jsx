import { useState } from "react";
import React from "react";
import TopicForm from "./TopicForm";
import Description from "./Description";
import VideoPlayer from "./VideoPlayer";
import Header from "../utils/Header";
import { GoogleGenAI } from "@google/genai";

const VideoGenUI = () => {
  const [description, setDescription] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleVideoGen = async (prompt) => {
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
      setVideoUrl(data?.secure_url);
    } catch (error) {
      setTimeout(() => {
        setError("Error: " + error.message);
      }, 3000);
      setVideoUrl("");
    }

    setLoading(false);
  };

  const handleDescriptionGen = async (prompt) => {
    try {
      setDescription("");
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are a expert on everything. Give brief overview on the topic. Keep it short",
        },
      });
      setDescription(response?.text);
    } catch (err) {
      setTimeout(() => {
        console.log(err);
        setError(err);
      }, 3000);
    }
  };

  return (
    <div>
      <Header />
      <TopicForm
        onSubmitVideo={handleVideoGen}
        onSubmitDescription={handleDescriptionGen}
        loading={loading}
      />
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-purple-500 rounded-full"></div>
        </div>
      )}
      {description !== null && <Description text={description || error} />}
      {!loading && videoUrl !== null && <VideoPlayer videoUrl={videoUrl} />}
    </div>
  );
};

export default VideoGenUI;
