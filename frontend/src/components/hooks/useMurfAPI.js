import axios from "axios";

const useMurfAPI = () => {
  const callMurf = async ({ prompt }) => {
    try {
      let data = JSON.stringify({
        text: prompt,
        voiceId: "bn-IN-ishani",
        style: "Conversational",
        pitch: 4,
        rate: 2,
        multiNativeLocale: "en-IN",
      });
      let config = {
        method: "post",
        url: "https://api.murf.ai/v1/speech/generate",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": import.meta.env.VITE_MURF_API,
        },
        data: data,
      };
      const response = await axios(config);
      return response?.data?.audioFile;
    } catch (error) {
      console.log(error);
    }
  };
  return { callMurf };
};

export default useMurfAPI;
