var billScraper = require("../");
var util = require('util');

billScraper.getBill("BILLSTATUS-115sres99", function(res){
  console.log(util.inspect(res, false, null));
});
