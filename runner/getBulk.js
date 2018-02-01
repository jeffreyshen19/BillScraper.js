var billScraper = require("../");

billScraper.getBulk("hr", function(res){
  console.log(res);
  billScraper.getBill(res[0], function(bill){
    console.log(bill);
  });
}, {
  congress: 115,
  session: 1
});
