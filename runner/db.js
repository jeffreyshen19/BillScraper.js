var billScraper = require("../");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bills");

billScraper.createBill("BILLS-113hr1033rs", {session: 2});

console.log("yo");
