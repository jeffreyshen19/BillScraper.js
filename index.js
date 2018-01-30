module.exports = {
  //Status
  getBulkStatus: require("./lib/scraper/getBulkStatus.js"),
  getBillStatus: require("./lib/scraper/getBillStatus.js"),
  cleanBillStatus: require("./lib/parser/cleanBillStatus.js"),

  //Bill
  getBill: require("./lib/scraper/getBill.js"),

  //Fields
  validBillTypes: ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"]
};
