var billScraper = require("../");
var util = require('util');

/*billScraper.getBill("BILLSTATUS-115hr999", function(res){
  billScraper.cleanBill(res, function(){

  });
});*/

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

billScraper.getBill("BILLSTATUS-115sres99", function(res){
  billScraper.cleanBill(res, function(parsedResult){
    console.log(util.inspect(parsedResult, false, null));
  });
});
