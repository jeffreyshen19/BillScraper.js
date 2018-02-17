var billScraper = require("./");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bills");
console.log("connected");
//billScraper.generateDB("hr", 115, 1); //hr is the bill type (see VALID_BILL_TYPES), 115 is the congress, and 1 is the session
billScraper.createBill("BILLS-113hr1033rs", {session: 2});
//For each the format of the Bill Schema's generated in the database, see BILL_TEMPLATE.md in docs
