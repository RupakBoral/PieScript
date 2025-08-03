import fs from "fs";
import FormData from "form-data";
import axios from "axios";

const createJob = async () => {
  try {
    const filePath = "PATH_TO_YOUR_FILE";

    const url = "https://api.murf.ai/v1/murfdub/jobs/create";
    const form = new FormData();

    // Read the file as a stream and append it to the form
    const fileStream = fs.createReadStream(filePath);
    form.append("file", fileStream, "hello_world.mp4"); // Add file name explicitly
    form.append("file_name", "hello_world.mp4");
    form.append("priority", "LOW");
    form.append("target_locales", "fr_FR");
    form.append("target_locales", "de_DE");

    const response = await axios.post(url, form, {
      headers: {
        "api-key": import.meta.env.VITE_MURF_API,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

export default createJob;
