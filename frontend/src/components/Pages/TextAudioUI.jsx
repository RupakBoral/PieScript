import { useState } from "react";
import useMurfAPI from "../hooks/useMurfAPI";
import { Button } from "@/components/ui/button";

const TextAudioUI = () => {
  const { callMurf } = useMurfAPI();

  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const prompt = formData.get("prompt");

    try {
      if (!prompt || prompt.trim().length === 0) {
        alert("Please enter some text to convert to audio");
        return;
      }
      setLoading(true);
      const response = await callMurf({ prompt });
      setAudioUrl(response);
    } catch (error) {
      setError("API error: " + error);
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
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r to-purple-400 from-white bg-clip-text ">
            Text to Audio
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transform your text into high-quality audio with our advanced
            AI-powered voice synthesis
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl mx-auto space-y-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <textarea
              name="prompt"
              rows="4"
              className="relative w-full p-6 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-2xl transition-all duration-300 text-lg font-medium resize-none"
              placeholder="Enter your text here to convert to audio... (e.g., 'Hello world, this is a sample text for audio conversion')"
              disabled={loading}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg min-w-[160px] group overflow-hidden"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <div>
                    <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                    <span className="animate-pulse">Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center cursor-pointer">
                    <p>Generate Audio</p>
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
        </form>

        {error && <p>{error}</p>}

        <div className="w-full max-w-4xl mx-auto">
          {!loading ? (
            audioUrl && (
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white/90 mb-6 text-center">
                  🎵 Your Generated Audio
                </h3>
                <div className="space-y-6">
                  <div className="bg-black/40 rounded-xl p-4">
                    <audio
                      src={audioUrl}
                      controls
                      className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={audioUrl}
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
export default TextAudioUI;
