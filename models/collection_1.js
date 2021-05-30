const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let collection1Schema = new Schema({
  message: String,
  timestamp: { type: Date },
});

module.exports = mongoose.model(
  "Collection_1",
  collection1Schema,
  "Collection_1"
);
