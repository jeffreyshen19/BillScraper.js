var billScraper = require("../");
var util = require("util");

billScraper.getBill("BILLS-113hr1033rs", function(res){
  console.log(util.inspect(res, false, null));
}, {session: 2});
