module.exports = {
  getBulkStatus: require("./lib/scraper/getBulkStatus.js"),
  getBillStatus: require("./lib/scraper/getBillStatus.js"),
  cleanBillStatus: require("./lib/parser/cleanBillStatus.js"),
  validBillTypes: ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"]
};
