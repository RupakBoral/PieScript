import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Video Generation", icon: "🎬" },
    { path: "/text-audio", label: "Text to Audio", icon: "🎵" },
    { path: "/translate", label: "Translation", icon: "🌐" },
    { path: "/dub", label: "Dubbing", icon: "🎭" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
            location.pathname === item.path
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
          }`}
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Navigation; 