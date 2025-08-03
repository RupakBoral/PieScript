import React, { useState } from "react";

const Translation = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      alert("Please enter some text to translate");
      return;
    }

    setLoading(true);
    // TODO: Implement translation API call here
    setTimeout(() => {
      setTranslatedText(
        `Translated: ${inputText} (Translation feature coming soon!)`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="relative z-20 my-12 space-y-8 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r to-purple-400 from-white bg-clip-text text-transparent">
            Translation
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Translate your text into multiple languages with AI-powered accuracy
          </p>
        </div>

        <form
          onSubmit={handleTranslate}
          className="w-full max-w-4xl mx-auto space-y-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows="4"
              className="relative w-full p-6 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-2xl transition-all duration-300 text-lg font-medium resize-none"
              placeholder="Enter text to translate..."
              disabled={loading}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="cursor-pointer relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg min-w-[160px] group overflow-hidden"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <div>
                    <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                    <span className="animate-pulse">Translating...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p>Translate</p>
                    <span>🌐</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </form>

        {translatedText && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white/90 mb-6 text-center">
                🌐 Translation Result
              </h3>
              <div className="bg-black/40 rounded-xl p-6">
                <p className="text-white/90 text-lg">{translatedText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translation;
