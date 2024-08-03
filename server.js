require("dotenv").config();
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const multer = require("multer");

const cors = require("cors");
app.use(cors());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const connectDB = require("./db/connect");
const routes = require("./Routes/index");
require("./jobs");

app.use(express.json());
app.use(routes);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    // Upload file to S3
    const data = await s3.upload(params).promise();

    // Return the file URL
    console.log("s3 url -", data.Location);
    res.status(200).json({ url: data.Location });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file");
  }
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
