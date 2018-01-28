var billScraper = require("../");
var util = require('util');

console.log("starting");

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

//validBillTypes.forEach(function(billtype){
  billScraper.getBulk("hr", function(res){
    res.forEach(function(element){
      try{
      billScraper.getBill(element, function(bill){
        console.log(util.inspect(bill.committees, false, null));
      });
      }
      catch(e){

      }
    });
  });

//});
