var request = require('request');
var htmlparser = require("htmlparser");
var select = require('soupselect').select;

/**
 * Accesses list of bills as an array
 * @param {string} billType - The type of bill (all, hr, s, hres, hjres, hconres, sconres, sjres, sres)
 * @param {object} options - Options (Optional)
 * @return {object} - Array result
 */

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

module.exports = function(billType, options){
  options = options || {};
  if(typeof billType != "string") throw new TypeError("'billType' needs to be a String");

  billType = billType.toLowerCase();
  if(!validBillTypes.includes(billType)) throw new TypeError("'billType' needs to be a valid bill type");

  var requestUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLSTATUS/115/" + billType;

  request(requestUrl, function (err, res, rawHTML) {
    if(err) throw err;

    new htmlparser.Parser(new htmlparser.DefaultHandler(function(error, dom){
      if(error) throw error;
      else{
        var table = select(dom, "#bulkdata .styles3 td a");
        var arrayRes = [];

        for(var i = 1; i < table.length; i++) arrayRes.push(table[i].children[0].raw.trim().replace(/\.xml/gi, ""));

        return arrayRes;
      }
    })).parseComplete(rawHTML);

  });
};
