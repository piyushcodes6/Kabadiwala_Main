const express = require("express");
const app = express();
const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  seller_User: {
    type: String,
    required: true,
  },

  transaction_Status: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  uploaded_Date: {
    type: Date,
  },
  buyer_User: {
    type: String,
    // required: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("trans", transSchema);
