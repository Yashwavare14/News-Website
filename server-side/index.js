require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/user-model");
const articleRoutes = require("./Routes/articles-routes");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

//---------------------------------------------middlewares-----------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET, POST, PUT, PATCH, DELETE",
//   credentials: true,
// };

// app.use(cors(corsOptions));

//------------------------------------CONNECT------TO------MONGODB----------------------------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb is connected"))
  .catch((error) => console.log("Mongo error", error));

//-----------------------------------------------Routes---------------------------------------------------

//test route
app.get("/", (req, res) => {
  res.send("server is working");
});

app.use("/saved-articles", articleRoutes);
app.use("/auth", userRoutes);

// registration route
// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exist" });
//     }

//     //creating a user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: "user created successfully", success: true });
//   } catch (error) {
//     res.status(500).json({
//       message: "error occured while registering",
//       success: false,
//       error,
//     });
//   }
// });

//login route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     //check if user exist
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "invalid email or password", success: false });
//     }
//     //check if the password is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "invalid email or password", success: false });
//     }

//     //create web token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "login successfull",
//       success: true,
//       token,
//       email,
//       username: user.username,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "error occured while logging in",
//       success: false,
//       error,
//     });
//   }
// });

//----------------------------------------starting the server---------------------------------
const startingServer = () => {
  try {
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startingServer();
