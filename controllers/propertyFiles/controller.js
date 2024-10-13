const { bulkUploadProperties } = require("../../jobs");
const PropertyFiles = require("../../models/propertyFiles");

const storeFiles = async (req, res) => {
  try {
    let { fileName, fileURL } = req.body;

    if (!fileName.length || !fileURL.length) {
      throw "filename and fileURL both are required fields";
    }
    fileName = fileName[0];
    fileURL = fileURL[0];
    const data = { fileName, fileURL, status: "pending" };
    const response = await PropertyFiles.create(data);
    // await bulkUploadProperties();
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const response = await PropertyFiles.find({});
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  storeFiles,
  getFiles,
};
