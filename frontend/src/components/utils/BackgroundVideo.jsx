import starVideo from "../../assets/star.mp4";

const BackgroundVideo = () => {
  return (
    <div className="absolute h-screen w-screen object-cover overflow-x-hidden">
      <div className="absolute opacity-10 w-full h-full bg-gradient-to-b from-slatee-900 to-slate-950 "></div>
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
