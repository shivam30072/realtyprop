const User = require("../../models/user");
const sendMail = require("../../nodemailer/sendMail");

const contactForm = async (req, res) => {
  try {
    const { email } = req.body;
    const isUserAlreadyExist = await User.findOne({ email });
    if (isUserAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    } else {
      const newUser = await User.create(req.body);
      await sendMail(newUser);
      return res.status(200).json({ success: true, data: newUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res
      .status(200)
      .json({ success: true, data: users, total: users.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  contactForm,
};
