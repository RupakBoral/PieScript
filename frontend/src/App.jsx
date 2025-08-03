import Footer from "./components/utils/Footer";
import VideoGenUI from "./components/VideoGen/VideoGenUI";
import TextAudioUI from "./components/Pages/TextAudioUI";
import Translation from "./components/Pages/Translation";
import Dubbing from "./components/Pages/Dubbing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<VideoGenUI />} />
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
