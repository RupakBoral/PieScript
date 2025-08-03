import React from "react";
import Header from "../utils/Header";

const Dubbing = () => {
  return (
    <div className="overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="relative z-20 my-12 space-y-8 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white/90 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Video Dubbing
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transform your videos with AI-powered dubbing in multiple languages
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="text-center text-white/70">
              <p className="text-lg mb-4">🎭 Dubbing feature coming soon!</p>
              <p className="text-sm">Upload your video and get it dubbed in your preferred language</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dubbing;
