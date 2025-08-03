import starVideo from "../../assets/star.mp4";

const BackgroundVideo = () => {
  return (
    <div className="absolute h-screen w-screen">
      <div className="absolute opacity-70 w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-purple-950"></div>
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-[-1] opacity-60"
      >
        <source src={starVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
