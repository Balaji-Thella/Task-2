const cron = require("node-cron");
const mongoose = require("mongoose");

const collection_1DB = mongoose.model("Collection_1");
const collection_2DB = mongoose.model("Collection_2");

function DateFormat(date) {
  var days = date.getDate();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var hours = date.getHours();
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = days + "/" + month + "/" + year + "/ " + hours + ":" + minutes;
  return strTime;
}

// cron.schedule("*/5 * * * *", () => {
cron.schedule("* * * * *", () => {
  console.log("CRON STARTED", DateFormat(new Date()));
  let dateNow = new Date();
  let dateAfter = new Date(dateNow.getTime() + 5 * 60000);
  collection_1DB
    .find({
      timestamp: {
        $gte: dateNow,
        $lt: dateAfter,
      },
    })
    .exec(function (err, resData) {
      console.log("resData", resData);
      if (resData.length > 0) {
        transferData(resData, 0);
      }
    });
});

function transferData(data, inc) {
  let info = data[inc];
  if (info) {
    storeMsg(info, function (err, res) {
      if (inc != data.length - 1) {
        inc = inc + 1;
        transferData(data, inc);
      } else {
        console.log("Transferred Successfully");
      }
    });
  }
}

function storeMsg(data, callback) {
  try {
    collection_2DB.create(
      { message: data.message, timestamp: data.timestamp },
      function (err, resData) {
        if (!err) {
          callback(1);
        } else {
          console.log("ERROR---", err);
        }
      }
    );
  } catch (e) {
    console.log("Storemsg Exception --", e);
    callback(1);
  }
}
