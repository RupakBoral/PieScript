// import { useState } from "react";
import React from "react";
import starVideo from "../../assets/star.mp4";

const TextAudioUI = () => {
  const handleSubmit = () => {};
  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
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
          <h1 className="text-white text-4xl w-fit font-semibold text-center mx-auto my-8">
            🎥 PieScript
          </h1>
          <form onSubmit={handleSubmit}>
            <h2>Text to Audio</h2>
            <input type="text" name="prompt" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TextAudioUI;
