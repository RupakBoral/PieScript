import Footer from "./components/utils/Footer";
import VideoGenUI from "./components/VideoGen/VideoGenUI";
import TextAudioUI from "./components/Pages/TextAudioUI";
import Translation from "./components/Pages/Translation";
import Dubbing from "./components/Pages/Dubbing";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import Home from "./components/Home";

function App() {
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="/text-video" element={<VideoGenUI />} />
            <Route path="text-audio" element={<TextAudioUI />} />
            <Route path="translate" element={<Translation />} />
            <Route path="dub" element={<Dubbing />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
