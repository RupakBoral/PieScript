const audioUpload = async (audioFile) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "video",
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    return result?.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw new Error("Failed to upload audio file");
  }
};

export default audioUpload;
