var billScraper = require("../");

/*billScraper.getBill("BILLSTATUS-115hr999", function(res){
  billScraper.parseBill(res, function(){

  });
});*/

console.log("starting");

billScraper.getBulk("hr", function(res){
  res.forEach(function(element){
    billScraper.getBill(element, function(bill){
      if(bill.title.length != 1) console.log(bill.title);
    });
  });
});
