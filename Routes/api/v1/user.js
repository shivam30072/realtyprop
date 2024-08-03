// all the routes related to user will be here

const {
  contactForm,
  getAllUsers,
} = require("../../../controllers/user/controller");
// const authMiddleware = require("../../../Middleware/authMiddleware");

// baseUrl here is `/api/v1/user`
const router = require("express").Router();

router.post("/contact-form", contactForm);
router.get("/getUsers", getAllUsers);

module.exports = router;
