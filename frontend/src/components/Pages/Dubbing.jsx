import React, { useState } from "react";

const Dubbing = () => {
  const [error, setError] = useState(null);

  const handleFile = async (event) => {
    try {
      if (event.target.files[0].type == "audio/*") {
        event.target.value = "";
        throw new Error("Please upload an audio file");
      }
      const audioFile = event?.target?.files[0];
      const formData = new FormData();
      formData.append("audio", audioFile);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/upload-audio`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Uploaded audio URL:", data.audioUrl);
    } catch (err) {
      setError(err?.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div>
      <h2 className="text-white">Dubbing</h2>
      <input
        accept="audio/wav, audio/mpeg"
        className="text-white"
        onChange={handleFile}
        type="file"
      />
      {error ? (
        <p className="text-red-500 font-semibold text-lg">{error}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Dubbing;
