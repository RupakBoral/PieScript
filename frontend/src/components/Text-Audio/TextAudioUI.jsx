// import { useState } from "react";
import Header from "../utils/Header";

const TextAudioUI = () => {
  const handleSubmit = () => {};
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <h2>Text to Audio</h2>
        <input type="text" name="prompt" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default TextAudioUI;
