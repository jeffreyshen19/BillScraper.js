module.exports = {
  // **Scraper**
    //Status
    getBulkStatus: require("./lib/scraper/getBulkStatus.js"),
    getBillStatus: require("./lib/scraper/getBillStatus.js"),

    //Bill
    getBulk: require("./lib/scraper/getBulk.js"),
    getBill: require("./lib/scraper/getBill.js"),

  // **Parser**
    //Status
    cleanBillStatus: require("./lib/parser/cleanBillStatus.js"),

    //Bill
    cleanBill: require("./lib/parser/cleanBill.js"),
    printBill: require("./lib/parser/printBill.js"),
    tagBill: require("./lib/parser/tagBill.js"),

  //Fields
  validBillTypes: ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"]
};
