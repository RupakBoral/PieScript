const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
      <h3 className="text-2xl font-bold text-white/90 mb-6 text-center">
        🎬 Generated Video
      </h3>
      <div className="bg-black/40 rounded-xl p-4">
        <video
          controls
          className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex justify-center mt-6">
        <a
          href={videoUrl}
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
          Download Video
        </a>
      </div>
    </div>
  );
};

export default VideoPlayer;
