const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");

const collection_1DB = mongoose.model("Collection_1");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/message", function (req, res, next) {
  let info = req.body;
  let dateString = info.date.toString() + " " + info.time.toString();
  // dateString = new Date(dateString);
  let parsedDate = moment(dateString, "DD-MM-YYYY H:mm:ss");
  console.log("parsedDate", parsedDate);
  let insertData = {
    message: info.message,
    timestamp: new Date(parsedDate),
  };
  collection_1DB.create(insertData, function (err, resData) {
    if (err) {
      res.json({
        status: false,
        Message: "Something Went Wrong",
      });
    }
    if (resData) {
      res.json({
        status: true,
        Message: "Message has been created successfully!",
      });
    } else {
      res.json({
        status: false,
        Message: "No Records Found",
      });
    }
  });
});

module.exports = router;
