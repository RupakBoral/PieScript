import { Outlet } from "react-router";
const Body = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <div className="flex-grow relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
