require("dotenv").config();
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const multer = require("multer");

const cors = require("cors");
app.use(
  cors({
    origin: "https://realtyadmin.vercel.app", // Allow all origins, or specify your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

// Optionally handle preflight requests
app.options("*", cors());

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

app.post("/upload", upload.array("files", 10), async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  try {
    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload each file to S3
      return s3.upload(params).promise();
    });

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);

    // Get the URLs of all uploaded files
    const urls = results.map((result) => result.Location);

    console.log("s3 urls -", urls);
    res.status(200).json({ urls });
  } catch (err) {
    console.error("Error uploading files:", err);
    res.status(500).send("Error uploading files");
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
