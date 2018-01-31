function recursiveClean(obj){
  for(var prop in obj){
    if(prop == "$") delete obj[prop];
    else if((prop == "enum" || prop == "header") && typeof obj[prop] == "object") obj[prop] = obj[prop][0];
    else if(prop == "text" && typeof obj[prop] == "object"){
      if(typeof obj[prop][0] == "object" && "_" in obj[prop][0]) obj[prop] = obj[prop][0]._;
      else obj[prop] = obj[prop][0];
    }

    if(typeof obj[prop] == "object") recursiveClean(obj[prop]);
  }
}

/**
 * Asynchronously parses the output from getBill.js into a more manageable object.
 * @param {object} bill - JSON bill (result from getBill.js)
 * @param {function} callback - Callback
 * @return {object} - JSON result
 * @example
 * getBill("BILLSTATUS-115sres99", function(res){
 *   cleanBill(res, function(parsedResult){
 *     //parsedResult is JSON
 *   });
 * });
 */

var cleanBill = function(bill, callback){
  if(typeof bill != "object") throw new TypeError("'bill' needs to be an object");
  if(callback == null) throw new TypeError("A callback needs to be included");

  var sections = Object.assign([], bill);

  try{
    recursiveClean(sections);
    callback(sections);
  }
  catch(e){
    throw new Error("JSON supplied must be a valid bill");
  }
};

module.exports = cleanBill;
