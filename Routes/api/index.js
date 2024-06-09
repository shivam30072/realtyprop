// this is the folder where different versions of API we can create
// right now there is one so its V1
// url here is '/api/v1'

const router = require("express").Router();
const v1 = require("./v1");

router.use("/v1", v1);

module.exports = router;
