const Description = ({ text }) => {
  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
      {text ? (
        <div>
          <h3 className="text-2xl font-bold text-white/90 mb-6 text-center">
            🤖 AI Description
          </h3>
          <div className="bg-black/40 rounded-xl p-6">
            <p className="text-white/90 text-lg leading-relaxed">{text}</p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white/90 mb-4">🤖 AI is Thinking...</h3>
          <div className="flex justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
