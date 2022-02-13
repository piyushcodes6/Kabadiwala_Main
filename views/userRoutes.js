const express = require("express");
const router = express.Router();
const req = require("express/lib/request");
const userSchema = require("../model/userSchema");

router.post("/Register", (req, res) => {
  const user = new userSchema(req.body);
  user.save((err, user) => {});
});
