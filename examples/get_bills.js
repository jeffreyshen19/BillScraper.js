var billScraper = require("bill-scraper");

//Getting bills (the actual bill text)
billScraper.getBill("BILLS-115hr1001ih", function(res){
  //res is a JSON object
}, {
  session: 1, //either 1 or 2
  clean: true //If this is false, it will just return the XML converted into JSON. If this is true, it will "clean" the JSON output (see sample cleaned and uncleaned output in example_outputs)
});

//Getting bills (the actual bill text)
billScraper.printBill(cleanedResultFromGetBill, function(res){
  /*Will output an object of the following template:
  {
    head: JSON with metadata on the bill,
    body: String that combines all the fields from getBill.
  }
  */

  //View sample output in example_outputs
});

//Getting bill statuses (a log of changes to the bill, cosponsors, and other metadata)
billScraper.getBillStatus("BILLSTATUS-115sres99", function(res){
  //res is a JSON object
}, {
  clean: true //If this is false, it will just return the XML converted into JSON. If this is true, it will "clean" the JSON output (see sample cleaned and uncleaned output in example_outputs)
});

//Getting a list of all bills
billScraper.getBulk("hr", function(res){ //hr is one of the valid bill types. For more information see docs/VALID_BILL_TYPES
  //res is an array
}, {
  congress: 115, //Can be either 113, 114, or 115.
  session: 1 //Can be either 1 or 2
});

//Getting a list of all bill statuses
billScraper.getBulk("hr", function(res){ //hr is one of the valid bill types. For more information see docs/VALID_BILL_TYPES
  //res is an array
}, {
  congress: 115, //Can be either 113, 114, or 115.
});
