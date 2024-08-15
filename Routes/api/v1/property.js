// all the routes related to user will be here

const {
  getProperties,
  uploadProperties,
  addImagesForProperty,
} = require("../../../controllers/property/controller");

// baseUrl here is `/api/v1/property`
const router = require("express").Router();

router.post("/getProperties", getProperties); // post route just because getting pagenumber and pagesize in body for pagination
router.post("/uploadProperties", uploadProperties);
router.post("/addImagesForProperty", addImagesForProperty);
module.exports = router;
