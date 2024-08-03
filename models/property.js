const mongoose = require("mongoose");

const porpertySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    aboutProject: {
      type: String,
    },
    projectRera: {
      type: String,
    },
    unitType: {
      type: String,
    },
    saleableArea: {
      type: String,
    },
    category: {
      type: String,
    },
    amenities: {
      type: String,
    },
    feature: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", porpertySchema);
