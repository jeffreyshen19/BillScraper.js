module.exports = {
  // **Database**
    createBill: require("./lib/database/createBill"),
    generateDB: require("./lib/database/generateDB"),
    Bill: require("./lib/database/models/Bill"),

  // **Scraper**
    //Status
    getBulkStatus: require("./lib/scraper/getBulkStatus"),
    getBillStatus: require("./lib/scraper/getBillStatus"),

    //Bill
    getBulk: require("./lib/scraper/getBulk"),
    getBill: require("./lib/scraper/getBill"),

  // **Parser**
    //Status
    cleanBillStatus: require("./lib/parser/cleanBillStatus"),

    //Bill
    cleanBill: require("./lib/parser/cleanBill"),
    printBill: require("./lib/parser/printBill"),
    tagBill: require("./lib/parser/tagBill"),

  //Fields
  validBillTypes: ["s", "hr"],
  validCongresses: [113, 114, 115]
};
