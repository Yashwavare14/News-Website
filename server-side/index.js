require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const articleRoutes = require("./Routes/articles-routes");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

//---------------------------------------------middlewares-----------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, PATCH, DELETE",
  credentials: true,
};

app.use(cors());

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

//----------------------------------------starting the server---------------------------------
const startingServer = () => {
  try {
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startingServer();
