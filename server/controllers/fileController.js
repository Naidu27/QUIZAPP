const { uploadFile } = require("../utils/blobStorage");

const uploadToAzure = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    const blobUrl = await uploadFile(
      req.file.buffer,
      fileName,
      req.file.mimetype
    );

    res.status(200).json({
      message: "File uploaded successfully",
      fileName,
      blobUrl,
    });
  } catch (error) {
    console.error("Azure Blob upload error:", error);

    res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};

module.exports = {
  uploadToAzure,
};