import Footer from "./components/utils/Footer";
import VideoGenUI from "./components/VideoGen/VideoGenUI";
import TextAudioUI from "./components/Text-Audio/TextAudioUI";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<VideoGenUI />} />
            <Route path="text-audio" element={<TextAudioUI />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
