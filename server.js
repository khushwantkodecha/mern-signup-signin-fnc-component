const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes/api");
// const cors = require("cors");

mongoose.Promise = global.Promise;

const app = express();
const PORT = process.env.PORT || 7070;

const mongo_URI =
  "mongodb+srv://khushwantkodecha:khushwantkodecha@mernsignupandsignin-cyktb.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongo_URI || "mongodb://localhost/mern_first", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("MONGOOSE CONNECTED!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HTTP request logger(it consoles https requests)
app.use(morgan("tiny"));

// app.use(cors());
app.use("/api", routes);

//serve static assets if in production
if (process.env.NODE_ENV === "pruduction") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
