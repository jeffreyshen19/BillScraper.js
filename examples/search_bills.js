var billScraper = require("bill-scraper");
var mongoose = require("mongoose");
var Bill = billScraper.Bill;

//Search using mongoose (details @ http://mongoosejs.com/docs/queries.html)
Bill.find({}, function (err, docs) {
  //docs is the searched output
});
