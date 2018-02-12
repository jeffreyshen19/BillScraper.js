function recursiveClean(obj){
  for(var prop in obj){
    if(prop == "$") delete obj[prop];
    else if((prop == "enum" || prop == "header" || prop == "congress" || prop == "session" || prop == "legis-num") && typeof obj[prop] == "object") obj[prop] = obj[prop][0];
    else if(prop == "text" && typeof obj[prop] == "object"){
      if(typeof obj[prop][0] == "object" && "_" in obj[prop][0]) obj[prop] = obj[prop][0]._;
      else obj[prop] = obj[prop][0];
    }

    if(typeof obj[prop] == "string") obj[prop] = obj[prop].replace(/(\t|\n)/g, " ").replace(/ {2,}/g, " ");
    if(typeof obj[prop] == "object") recursiveClean(obj[prop]);
  }
}

/**
 * Asynchronously parses the output from getBill.js into a more manageable object.
 * @param {object} bill - JSON bill (result from getBill.js)
 * @param {function} callback - Callback
 * @return {object} - JSON result
 * @example
 * getBill("BILLS-115hr1001ih", function(res){
 *   cleanBill(res, function(parsedResult){
 *     //parsedResult is JSON
 *   });
 * });
 */

var cleanBill = function(bill, callback){
  if(typeof bill != "object") throw new TypeError("'bill' needs to be an object");
  if(callback == null) throw new TypeError("A callback needs to be included");

  var sections = Object.assign({}, bill);

  try{
    recursiveClean(sections);

    sections.form = sections.form[0];
    sections.form.chamber = sections.form["current-chamber"][0]._;
    sections.form.title = sections.form["official-title"][0]._;
    sections.form.number = sections.form["legis-num"];
    sections.body = sections["legis-body"];

    delete sections.form["distribution-code"];
    delete sections.form["associated-doc"];
    delete sections.form["legis-type"];
    delete sections.form.calendar;
    delete sections.form.action;
    delete sections.form["official-title"];
    delete sections["legis-body"];
    delete sections.endorsement;
    delete sections.form["current-chamber"];
    delete sections.form["legis-num"];

    sections.head = sections.form;
    delete sections.form;

    callback(sections);
  }
  catch(e){
    throw new Error("JSON supplied must be a valid bill");
  }
};

module.exports = cleanBill;
