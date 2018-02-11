var billScraper = require("../");

billScraper.getBulk("hr", function(res){
  res.forEach(function(bill){
    console.log(bill);
    billScraper.getBill(bill, function(result){

    });
  });
}, {
  congress: 115,
  session: 1
});

console.log("done");
