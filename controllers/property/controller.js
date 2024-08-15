const { bulkUploadProperties } = require("../../jobs");
const Property = require("../../models/property");

const getProperties = async (req, res) => {
  try {
    const pageNumber = parseInt(req.body.pageNumber) || 1;
    const pageSize = parseInt(req.body.pageSize) || 5;

    const skip = (pageNumber - 1) * pageSize;

    const totalDocuments = await Property.countDocuments({});
    const totalPages = Math.ceil(totalDocuments / pageSize);

    const response = await Property.find({}).skip(skip).limit(pageSize);
    return res.status(200).json({
      success: true,
      data: { response, pageNumber, pageSize, totalPages },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
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
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addImagesForProperty = async (req, res) => {
  try {
    const { id, imgs } = req.body;
    const property = await Property.findOne({ _id: id });
    if (property) {
      property.imgs = imgs;
      await property.save();
      return res
        .status(200)
        .json({ success: true, message: "Images updated successfully." });
    }

    return res
      .status(404)
      .json({ success: false, message: "Property not found." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProperties,
  uploadProperties,
  addImagesForProperty,
};
