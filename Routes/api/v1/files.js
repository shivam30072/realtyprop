// all the routes related to user will be here

const {
  storeFiles,
  getFiles,
} = require("../../../controllers/propertyFiles/controller");
// const authMiddleware = require("../../../Middleware/authMiddleware");

// baseUrl here is `/api/v1/files`
const router = require("express").Router();

router.post("/storeFiles", storeFiles);
router.get("/getFiles", getFiles);
module.exports = router;
