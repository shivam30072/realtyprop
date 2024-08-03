// all the routes related to user will be here

const {
  getProperties,
  uploadProperties,
} = require("../../../controllers/property/controller");

// baseUrl here is `/api/v1/property`
const router = require("express").Router();

router.get("/getProperties", getProperties);
router.post("/uploadProperties", uploadProperties);
module.exports = router;
