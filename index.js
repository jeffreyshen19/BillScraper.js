module.exports = {
  // **Database**
    createBill: require("./lib/database/createBill"),

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
  validBillTypes: ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"]
};
