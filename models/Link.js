// import mongoose from "mongoose";
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  linkFrom: {
    type: String,
    required: true,
  },
  linkTo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "MR Short Links"
  },
  description: {
    type: String,
    default: "This link was provided by mr-sl.com",
  },
  image: {
    type: String,
    default: "https://mr-sl.com/logo_black.png" 
  }
});

module.exports = mongoose.model("Link", linkSchema);
