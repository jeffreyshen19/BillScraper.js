module.exports = {
  getBulk: require("./lib/scraper/getBulk.js"),
  getBill: require("./lib/scraper/getBill.js"),
  cleanBill: require("./lib/parser/cleanBill.js"),
  validBillTypes: ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"]
};
