import { Outlet } from "react-router";
import Navigation from "./components/utils/Navigation";
import BackgroundVideo from "./components/utils/BackgroundVideo";

const Body = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <Navigation />
      <div className="flex-grow relative z-10">
        <BackgroundVideo />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
