var billScraper = require("../");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bills");

billScraper.createBill("BILLS-115hr1107rfs", {session: 2});

console.log("yo");
