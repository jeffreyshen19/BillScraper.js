var billScraper = require("./");

billScraper.getBill("BILLS-113hr1033rs", function(res){
 billScraper.printBill(res, function(parsedResult){
   billScraper.tagBill(parsedResult, function(tags){
      console.log(tags);
   });
 });
}, {session: 2});
