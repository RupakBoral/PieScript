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
    <div className="overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="relative z-20 my-12 space-y-8 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white/90 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Video Generation
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transform your ideas into stunning videos with our advanced AI-powered video generation
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <TopicForm
            onSubmitVideo={handleVideoGen}
            onSubmitDescription={handleDescriptionGen}
            loading={loading}
          />
          
          {loading && (
            <div className="flex justify-center mt-8">
              <div className="inline-flex items-center gap-3 text-white/70 text-lg">
                <div className="animate-spin h-6 w-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full"></div>
                <span className="animate-pulse">Generating your video...</span>
              </div>
            </div>
          )}
          
          {description !== null && (
            <div className="mt-8">
              <Description text={description || error} />
            </div>
          )}
          
          {!loading && videoUrl !== null && (
            <div className="mt-8">
              <VideoPlayer videoUrl={videoUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenUI;
