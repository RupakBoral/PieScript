import { Link, useLocation } from "react-router";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/text-video", label: "Video Generation", icon: "🎬" },
    { path: "/text-audio", label: "Text to Audio", icon: "🎵" },
    { path: "/translate", label: "Translation", icon: "🌐" },
    { path: "/dub", label: "Dubbing", icon: "🎭" },
  ];

  return (
    <nav className="relative z-20 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={"/"} className="text-white text-xl font-bold">
              PieScript
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105 ${
                    location.pathname === item.path
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-white focus:outline-none focus:text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/30 backdrop-blur-xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-purple-600 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
