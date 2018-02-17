var billScraper = require("bill-scraper");
var mongoose = require("mongoose");

mongoose.connect("URI OF MONGO DATABASE");
billScraper.generateDB("hr", 115, 1); //hr is the bill type (see VALID_BILL_TYPES), 115 is the congress, and 1 is the session

//For each the format of the Bill Schema's generated in the database, see BILL_TEMPLATE.md in docs
