var billScraper = require("../");
var util = require("util");

billScraper.getBill("BILLS-115hr1000ih", function(res){
  console.log(util.inspect(res, false, null));
});
