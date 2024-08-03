const { bulkUploadProperties } = require("../../jobs");
const property = require("../../models/property");

const getProperties = async (req, res) => {
  try {
    const response = await property.find({});
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const uploadProperties = async (req, res) => {
  try {
    const response = await bulkUploadProperties();
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getProperties,
  uploadProperties,
};
