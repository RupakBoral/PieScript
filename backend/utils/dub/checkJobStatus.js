import axios from "axios";

const checkJobStatus = async (job_id, maxTries = 10, delay = 3000) => {
  for (let i = 0; i < maxTries; i++) {
    const res = await axios.get(
      `https://api.murf.ai/v1/murfdub/jobs/${job_id}/status`,
      {
        headers: {
          "api-key": process.env.MURF_API_KEY,
        },
      }
    );

    const url = res.data?.download_details?.download_srt_url;
    if (url) return url;

    await new Promise((r) => setTimeout(r, delay));
  }
  throw new Error("Timeout: Murf job not ready");
};

export default checkJobStatus;
