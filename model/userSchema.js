const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
  },

  photos: {
    type: String,
  },
  password: {
    type: String,
  },

  address: {
    type: String,
    required: true,
  },
  created_Date: {
    type: Date,
  },
  updated_Date: {
    type: Date,
  },
});

module.exports = mongoose.model("user", userSchema);
