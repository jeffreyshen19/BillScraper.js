var billScraper = require("./");

billScraper.getBillStatus("BILLSTATUS-115hr999", function(res){
  console.log(JSON.stringify(res));
}, {
  clean: false
});
