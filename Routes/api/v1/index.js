// all the apis will be here for different models
// example for user its userRoutes
// url here is '/api/v1/user'

const router = require("express").Router();
const userRoutes = require("./user");
const filesRouter = require("./files");
const propertyRouter = require("./property");

router.use("/user", userRoutes);
router.use("/files", filesRouter);
router.use("/property", propertyRouter);

module.exports = router;
