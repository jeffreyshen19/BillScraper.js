var billScraper = require("../");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bills");

billScraper.generateDB("hr", 115, 1);
