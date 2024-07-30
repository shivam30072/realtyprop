const mongoose = require("mongoose");

const propertyFilesSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    fileURL: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PropertyFiles", propertyFilesSchema);
