var Bill = require("./models/Bill");
var getBill = require("../scraper/getBill");
var printBill = require("../parser/printBill");
var tagBill = require("../parser/tagBill");
var getBillStatus = require("../scraper/getBillStatus");

/**
 * Adds a Bill schema to the bill database
 * @param {string} bill - Name of the bill (i.e. BILLS-113hr1033rs)
 * @param {object} options - Options (Optional)
 * @param {number} session - Session Number (Default: 1)
 * @return {object} - JSON result
 * @example
 * createBill("BILLS-113hr1033rs", {session: 2});
 */

var createBill = function(bill, options){
  //TODO: make this more resilient to errors

  options = options || {};
  var session = ("session" in options) ? options.session : 1;
  if(typeof session != "number" || (session != 1 && session != 2)) throw new TypeError("'options.session' must be either 1 or 2");

  var newBill = new Bill();
  newBill.congress = bill.replace("BILLS-", "").replace(/(s|hr).+$/g, "");
  newBill.session = session;
  newBill.type = bill.replace(/BILLS-11[3-5]/, "").replace(/[0-9]+[a-z]{2,}$/g, "");
  newBill.url = "https://www.gpo.gov/fdsys/bulkdata/BILLS/" + newBill.congress + "/" + newBill.session + "/" + newBill.type + "/" + bill + ".xml";

  Bill.find({url: newBill.url}, function (err, bills){
    if(!bills.length){
      getBill(bill, function(res, err){
        if(!err){
          printBill(res, function(parsedResult){
            newBill.text = parsedResult.body;
            newBill.title = parsedResult.head.title;
            if (parsedResult.head.chamber == "IN THE SENATE OF THE UNITED STATES") newBill.chamber = 'senate';
            else if (parsedResult.head.chamber == "IN THE HOUSE OF REPRESENTATIVES") newBill.chamber = 'house';
            else newBill.chamber = parsedResult.head.chamber;

            if(typeof parsedResult.head.number == "object") newBill.number = parsedResult.head.number._;
            else newBill.number = parsedResult.head.number;

            newBill.numberInt = parseInt(newBill.number.replace(/\D/g, ""));

            var billStatusName = "BILLSTATUS-" + newBill.congress + newBill.type + newBill.numberInt;

            newBill.statusUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLSTATUS/" + newBill.congress + "/" + newBill.type + "/" + billStatusName + ".xml";

            tagBill(parsedResult, function(tags){
              newBill.tags = tags;

              getBillStatus(billStatusName, function(res){
                newBill.billStatus = res;
                newBill.save(function(err){
                  if(err) throw Error("Unable to save bill to database");
                  else console.log("Successfully saved " + bill + " to database");
                });
              });
            });
          });
        }
      }, {session: session});
    }
  });
};

module.exports = createBill;
