const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="my-6 relative z-20">
      <video
        controls
        className="w-2/3 mx-auto rounded border-2 border-white/60"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
