const express = require("express");
const upload = require("../middleware/upload");
const { uploadToAzure } = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadToAzure);

module.exports = router;