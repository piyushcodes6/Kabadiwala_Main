require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./views/userRoutes");
const passport = require("passport");
const cookieSession = require("cookie-session");
const router = express.Router();
const req = require("express/lib/request");
const userSchema = require("./model/userSchema");
const transSchema = require("./model/transSchema");

require("./passport-setup");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://MONGO_USER:12345@cluster0.vi2oi.mongodb.net/Scrapers?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`DB Connected`);
  })
  .catch(() => {
    console.log(err);
  });

app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

app.set("view engine", "ejs");

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render("pages/index"));
app.get("/failed", (req, res) => res.send("You Failed to log in!"));

app.get("/good", isLoggedIn, (req, res) => {
  res.render("pages/profile", {
    name: req.user.displayName,
    pic: req.user.photos[0].value,
    email: req.user.emails[0].value,
  });
});

app.post("/Register", (req, res) => {
  const user = new userSchema(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json({ success: "user Registered", user });
    }
  });
});

app.get("/Login", (req, res) => {
  const user = new userSchema(req.body);
  userSchema.find(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
      if (
        req.params.email == userSchema.email ||
        req.params.password == userSchema.password
      ) {
        res.status(200).json({ success: "Login Succesfull", user });
        console.log(user);
      } else {
        res.status(404).json(err);
        console.log(err);
      }
    }
  );
});

app.post("/Transaction", (req, res) => {
  const trans = new transSchema(req.body);
  trans.save((err, trans) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json({ success: "transaction completed", trans });
    }
  });
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.listen(5000, () => console.log(`Example app listening on port ${5000}!`));
