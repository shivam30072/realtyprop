const { bulkUploadProperties } = require("../../jobs");
const property = require("../../models/property");

const getProperties = async (req, res) => {
  try {
    const pageNumber = parseInt(req.body.pageNumber) || 1;
    const pageSize = parseInt(req.body.pageSize) || 5;

    const skip = (pageNumber - 1) * pageSize;

    const totalDocuments = await property.countDocuments({});
    const totalPages = Math.ceil(totalDocuments / pageSize);

    const response = await property.find({}).skip(skip).limit(pageSize);
    return res.status(200).json({
      success: true,
      data: { response, pageNumber, pageSize, totalPages },
    });
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
