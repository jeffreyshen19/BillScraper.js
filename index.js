module.exports = {
  /*
    DATABASE
    Methods that aid in generating the database of bills
  */
  createBill: require("./lib/database/createBill"),
  generateDB: require("./lib/database/generateDB"),
  Bill: require("./lib/database/models/Bill"),

  /*
    SCRAPER
    Methods that grab data from the server
  */
  //Get Statuses
  getBulkStatus: require("./lib/scraper/getBulkStatus"),
  getBillStatus: require("./lib/scraper/getBillStatus"),

  //Get Bills
  getBulk: require("./lib/scraper/getBulk"),
  getBill: require("./lib/scraper/getBill"),

  /*
    PARSER
    Methods that clean up and analyze the raw data grabbed from the server
  */
  //Clean statuses
  cleanBillStatus: require("./lib/parser/cleanBillStatus"),

  //Work with bills
  cleanBill: require("./lib/parser/cleanBill"),
  printBill: require("./lib/parser/printBill"),
  tagBill: require("./lib/parser/tagBill"),

  /*
    FIELDS
  */
  validBillTypes: ["s", "hr"],
  validCongresses: [113, 114, 115]
};
