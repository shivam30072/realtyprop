require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const connectDB = require("./db/connect");
const routes = require("./Routes/index");

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URI ||
        "mongodb+srv://shivam30072:cTwT83qQARJFzokQ@cluster0.3yzfzx9.mongodb.net/REALTY-UNIT?retryWrites=true&w=majority"
    );
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
