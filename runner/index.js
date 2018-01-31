var billScraper = require("../");
var util = require('util');

console.log("starting");

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

//validBillTypes.forEach(function(billtype){
  billScraper.getBulkStatus("hr", function(res){
    console.log(res);
  }, {congress: 113});

//});
