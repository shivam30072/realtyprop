const propertyFiles = require("./models/propertyFiles");
const XLSX = require("xlsx");
const { tz } = require("moment-timezone").tz("Asia/Kolkata");
const moment = require("moment");
const AWS = require("aws-sdk");
const property = require("./models/property");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.BUCKET_NAME;

const bulkUploadProperties = async () => {
  try {
    const daysBehind = moment().subtract(1, "days").toDate();
    const pendingFiles = await propertyFiles.findOne({
      status: "pending",
      createdAt: { $gte: daysBehind },
    });
    let doneUploadingFile = false;

    if (pendingFiles) {
      console.log("BUP - FileURL= ", pendingFiles.fileURL);
      if (await bulkUpload(pendingFiles.fileURL)) {
        doneUploadingFile = true;
      } else {
        console.log("BUP - Error while uploading file");
      }

      pendingFiles.status = doneUploadingFile ? "success" : "failed";
      await pendingFiles.save();
      return pendingFiles.status;
    } else {
      console.log("BUP - No pending files found in the last 24 hours");
      return "No pending files found in the last 24 hours";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const bulkUpload = async (fileURL) => {
  try {
    const s3FileKey = fileURL.split("/").pop();
    const params = {
      Bucket: bucketName,
      Key: s3FileKey,
    };
    const data = await s3.getObject(params).promise();
    const doneUploding = await processData(data.Body);
    return doneUploding;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const processData = async (data) => {
  try {
    const workbook = XLSX.read(data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log("BUP - Data to be Inserted ", jsonData.length);
    const result = await property.insertMany(jsonData);

    console.log("BUP - Data inserted successfully");
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  bulkUploadProperties,
};
