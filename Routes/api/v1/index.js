// all the apis will be here for different models
// example for user its userRoutes
// url here is '/api/v1/user'

const router = require("express").Router();
const userRoutes = require("./user");

router.use("/user", userRoutes);

module.exports = router;
