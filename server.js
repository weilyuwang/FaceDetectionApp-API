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
    host: "127.0.0.1", // local host
    user: "weilyu",
    password: "",
    database: "face-rec"
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
  res.send(database.users);
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

app.listen(4000, () => {
  console.log("app is running on port 4000");
});

// routes

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId  --> GET = user 
/image --> PUT --> user
*/
