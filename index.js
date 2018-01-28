module.exports = {
  getBulk: require("./lib/scraper/getBulk.js"),
  getBill: require("./lib/scraper/getBill.js"),
  parseBill: require("./lib/parser/parseBill.js"),
  validBillTypes: ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"]
};
