import React from "react";
import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";

const Dubbing = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [DownloadUrl, setDownloadUrl] = useState(null);
  const fileTypes = ["audio/wav", "audio/mpeg"];

  const handleDub = async (url) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/audio/murf/job`,
        { fileUrl: url }
      );
      setDownloadUrl(response?.data?.download_audio_url);
      setError(response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    } catch (error) {
      setError(error?.message || "Dub generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileInput = (event) => {
    if (!fileTypes.includes(event?.target?.files[0]?.type)) {
      throw new Error("Please upload audio file");
    }
    const file = event.target.files[0];
    setFile(file);
  };

  const handleCloudUpload = async () => {
    try {
      setLoading(true);

      if (!file) {
        throw new Error("Please upload an audio file first");
      }

      const formData = new FormData();
      formData.append("audio", file);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PROD_URL}/audio`,
        formData
      );

      if (response?.data?.audioUrl) {
        setAudioUrl(response.data.audioUrl);
        await handleDub(response.data.audioUrl);
      }
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error?.response?.data?.message || error?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="relative z-20 my-12 space-y-8 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-semibold bg-gradient-to-r to-purple-400 from-white bg-clip-text text-transparent">
            Voice Dubbing
          </h2>
          <p className="text-white/80 font-thin text-xl max-w-2xl mx-auto">
            Transform your audio with AI-powered dubbing in multiple languages
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="text-center text-white/70 flex flex-col gap-4 items-center">
              <p className="text-sm">
                Upload your video and get it dubbed in your preferred language
              </p>

              {file && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 text-sm">
                    File uploaded: {file.name} ({(file.size / 1024).toFixed(1)}{" "}
                    KB)
                  </p>
                  <p className="hidden">{audioUrl}</p>
                </div>
              )}

              <div
                className={`w-full max-w-md mx-auto p-8 border-2 border-dashed rounded-lg transition-all duration-300`}
              >
                <div className="text-center space-y-4">
                  <Upload className="w-12 h-12 mx-auto text-white/50" />
                  <input
                    type="file"
                    accept="audio/wav, audio/mp3"
                    onChange={(event) => handleFileInput(event)}
                    className="px-6 py-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                  />
                  <p className="text-white/40 text-xs">
                    Supported formats: WAV, MP3 (Max 10MB)
                  </p>
                </div>
              </div>

              {error && <p className="text-red-500 text-lg">{error}</p>}

              <div className="flex justify-center">
                <button
                  onClick={handleCloudUpload}
                  type="submit"
                  className="cursor-pointer relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg min-w-[160px] group overflow-hidden"
                  disabled={loading || !file}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <div>
                        <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                        <span className="animate-pulse">Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>🎭 Generate Audio</p>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {!loading ? (
            DownloadUrl && (
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white/90 mb-6 text-center">
                  🎵 Your Generated Audio
                </h3>
                <div className="space-y-6">
                  <div className="bg-black/40 rounded-xl p-4">
                    <audio
                      src={DownloadUrl}
                      controls
                      className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={DownloadUrl}
                      download
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download Audio
                    </a>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-white/70 text-lg">
                <div className="animate-spin h-6 w-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full"></div>
                <span className="animate-pulse">Generating your audio...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dubbing;
