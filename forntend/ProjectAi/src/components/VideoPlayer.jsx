const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="p-4">
      <video controls className="w-full rounded shadow-lg">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
