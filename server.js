// Backend server with RESTful API created using Node.js and Express.js

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

db.select("*")
  .from("users")
  .then(data => {
    console.log(data);
  });

const app = express();

app.use(bodyParser.json()); // use middleware body parser
app.use(cors()); // use middleware cors

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", signin.handleSignin(db, bcrypt));
// the function above is the same as the function below:
// app.post("/signin", (req, res) => {
//   signin.handleSignin(req, res, db, bcrypt);
// });

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", profile.handleProfileGet(db));

app.put("/image", image.handleImage(db));

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
