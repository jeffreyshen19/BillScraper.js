module.exports = {
  //Status
  getBulkStatus: require("./lib/scraper/getBulkStatus.js"),
  getBillStatus: require("./lib/scraper/getBillStatus.js"),
  cleanBillStatus: require("./lib/parser/cleanBillStatus.js"),

  //Bill
  getBill: require("./lib/scraper/getBill.js"),
  cleanBill: require("./lib/parser/cleanBill.js"),
  printBill: require("./lib/parser/printBill.js"),

  //Fields
  validBillTypes: ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"]
};
