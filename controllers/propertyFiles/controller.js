const PropertyFiles = require("../../models/propertyFiles");

const storeFiles = async (req, res) => {
  try {
    const { fileName, fileURL } = req.body;

    if (!fileName || !fileURL) {
      throw "filename and fileURL both are required fields";
    }
    const data = { ...req.body, status: "pending" };
    const response = await PropertyFiles.create(data);
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
