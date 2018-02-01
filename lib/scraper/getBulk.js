var request = require('request');
var htmlparser = require("htmlparser");
var select = require('soupselect').select;

var validBillTypes = ["sres", "sjres", "sconres", "s", "hres", "hr", "hjres", "hconres"];

/**
 * Asynchronously accesses list of bills in a given session as an array
 * @param {string} billType - The type of bill (hr, s, hres, hjres, hconres, sconres, sjres, sres)
 * @param {function} callback - Callback (with one paramater)
 * @param {object} options - Options (Optional)
 * @param {integer} options.session - Which congressional session (default: 1)
 * @param {integer} options.congress - Which congress (Default: 115)
 * @example
 * getBulk("sres", function(res){
 *  //res is an array
 * }, {
 *   congress: 115,
 *   session: 1
 * });
 */

var getBulk = function(billType, callback, options){
  options = options || {};
  var congress = ("congress" in options) ? options.congress : 115;
  var session = ("session" in options) ? options.session : 1;

  if(typeof congress != "number" || congress < 113 || congress > 115) throw new TypeError("'options.congress' must be a number between 113 and 115");
  if(typeof session != "number" || (session != 1 && session != 2)) throw new TypeError("'options.session' must be either 1 or 2");

  if(typeof billType != "string") throw new TypeError("'billType' needs to be a String");
  if(callback == null) throw new TypeError("A callback needs to be included");

  billType = billType.toLowerCase();
  if(!validBillTypes.includes(billType)) throw new TypeError("'billType' needs to be a valid bill type");

  var requestUrl = "https://www.gpo.gov/fdsys/bulkdata/BILLS/" + congress + "/" + session + "/" + billType;

  request(requestUrl, function (err, res, rawHTML){ //Access the GPO website as HTML
    if(err) throw err;

    new htmlparser.Parser(new htmlparser.DefaultHandler(function(error, dom){
      if(error) throw error;
      else{
        var table = select(dom, "#bulkdata .styles3 td a"); //Select the relevant HTMl tags
        var arrayRes = [];

        for(var i = 2; i < table.length; i++) arrayRes.push(table[i].children[0].raw.trim().replace(/\.xml/gi, "")); //Clean up and push the data to the result array

        callback(arrayRes);
      }
    })).parseComplete(rawHTML);

  });
};

module.exports = getBulk;
