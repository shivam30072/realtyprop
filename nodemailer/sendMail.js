const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER || "Realityunit81@gmail.com",
    pass: process.env.APP_PASSWORD || "grosmrtpvgfudhws",
  },
  tls: {
    rejectUnauthorized: false, // This will ignore the self-signed certificate error
  },
});

const sendMail = async (userData) => {
  const filePathManager = path.join(__dirname, "mailTemplate.html");
  const filePathUser = path.join(__dirname, "welcomeTemplate.html");

  const sourceManager = fs.readFileSync(filePathManager, "utf-8").toString();
  const sourceUser = fs.readFileSync(filePathUser, "utf-8").toString();

  const managerTemplate = handlebars.compile(sourceManager, {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  });

  const userTemplate = handlebars.compile(sourceUser, {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  });

  console.log(userData);

  const { name, email, phone, message } = userData;
  const templateForManager = managerTemplate({ name, email, phone, message });

  const templateForUser = userTemplate({ name, email, phone, message });

  const mailOptionsToManager = {
    from: {
      name: "Realty Unit",
      address: process.env.USER || "Realityunit81@gmail.com",
    },
    to: ["Info@realtyunit.in"],
    subject: "New User Registration",
    html: templateForManager,
  };

  const mailOptionsToUser = {
    from: {
      name: "Realty Unit",
      address: process.env.USER || "Realityunit81@gmail.com",
    },
    to: [email],
    subject: "Thank You for Your Inquiry",
    html: templateForUser,
  };
  try {
    await transporter.sendMail(mailOptionsToManager);
    console.log("Email has been sent successfully to Manager");

    await transporter.sendMail(mailOptionsToUser);
    console.log("Email has been sent successfully to User");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
