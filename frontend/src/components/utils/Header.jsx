import starVideo from "../../assets/star.mp4";
const Header = () => {
  return (
    <div className="">
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src={starVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative min-w-screen z-10">
        <h2 className="text-white text-3xl text-center font-mono font-semibold mt-8">
          PieScript
        </h2>
      </div>
    </div>
  );
};

export default Header;
