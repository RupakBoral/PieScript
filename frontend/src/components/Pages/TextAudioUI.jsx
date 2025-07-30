// import { useState } from "react";
import { useState } from "react";
import useMurfAPI from "../hooks/useMurfAPI";
import Header from "../utils/Header";
import { Button } from "@/components/ui/button";

const TextAudioUI = () => {
  const { callMurf } = useMurfAPI();

  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const prompt = formData.get("prompt");

    try {
      if (!prompt || prompt.trim().length === 0) {
        alert("Please enter some text to convert to audio");
        return;
      }
      console.log("API call started with prompt:", prompt);
      setLoading(true);
      const response = await callMurf({ prompt });
      setAudioUrl(response);
    } catch (error) {
      console.log("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="relative z-20 my-6 space-y-6">
        <h2 className="text-xl text-center font-bold text-white/70">
          Text to Audio
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-2/3 mx-auto flex gap-4"
        >
          <input
            type="text"
            name="prompt"
            className="w-5/6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-amber-50/70 text-amber-50 font-semibold"
            placeholder="Enter text to convert to audio..."
          />
          <Button
            type="submit"
            className="p-4 cursor-pointer h-12 w-fit bg-purple-700"
          >
            Generate
          </Button>
        </form>
        <div className="mt-6 w-2/3 mx-auto">
          {!loading ? (
            audioUrl && (
              <div>
                <audio src={audioUrl} controls className="w-full rounded-lg" />
                <a
                  href={audioUrl}
                  variant="link"
                  className="text-white font-semibold text-lg"
                >
                  Download
                </a>
              </div>
            )
          ) : (
            <p className="text-white text-center">Generating Audio...</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TextAudioUI;
