const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = process.env.PORT || 3000;

const uri =
  "mongodb+srv://<testuser>:<test1234>@seaspender.ezumbtz.mongodb.net/?retryWrites=true&w=majority&appName=SeaSpender";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello SeaSpender!");
});

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
