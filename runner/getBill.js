var billScraper = require("../");
var util = require("util");

billScraper.getBill("BILLS-113hr1033rs", function(res){
  billScraper.printBill(res, function(parsedResult){
    console.log(JSON.stringify(parsedResult));
  });
}, {session: 2});
