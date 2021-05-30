const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let collection2Schema = new Schema({
  message: String,
  timestamp: { type: Date },
});

module.exports = mongoose.model(
  "Collection_2",
  collection2Schema,
  "Collection_2"
);
