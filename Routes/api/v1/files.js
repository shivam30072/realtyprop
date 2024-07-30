// all the routes related to user will be here

const { storeFiles } = require("../../../controllers/propertyFiles/controller");
// const authMiddleware = require("../../../Middleware/authMiddleware");

// url here is `/api/v1/files`
const router = require("express").Router();

router.post("/storeFiles", storeFiles);
module.exports = router;
