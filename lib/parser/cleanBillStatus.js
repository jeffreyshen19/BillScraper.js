var request = require('request');
var parseXml = require('xml2js').parseString;

function convertArraysToString(obj){
  for(var prop in obj){
    if(obj.hasOwnProperty(prop) && typeof obj[prop] == "object"){
      if(obj[prop].length == 1){
        obj[prop] = obj[prop][0];
        if(!isNaN(obj[prop]) && obj[prop].length > 0) obj[prop] = parseInt(obj[prop]); //Parse all number strings into numbers
        if(typeof obj[prop] == "object") convertArraysToString(obj[prop]);
      }
      else{
        convertArraysToString(obj[prop]);
      }
    }
  }
}

/**
 * Asynchronously parses the output from getBillStatus.js into a more manageable object.
 * @param {object} bill - JSON bill (result from getBillStatus.js)
 * @param {function} callback - Callback
 * @return {object} - JSON result
 * @example
 * getBillStatus("BILLSTATUS-115sres99", function(res){
 *   cleanBillStatus(res, function(parsedResult){
 *     //parsedResult is JSON
 *   });
 * });
 */

var cleanBillStatus = function(bill, callback){
  if(typeof bill != "object") throw new TypeError("'bill' needs to be an object");
  if(callback == null) throw new TypeError("A callback needs to be included");

  var billCopy = Object.assign({}, bill);

  try{
    //Remove extraneous fields
    if("constitutionalAuthorityStatementText" in bill) delete billCopy.constitutionalAuthorityStatementText;
    if("version" in bill) delete billCopy.version;
    if("latestAction" in bill) delete billCopy.latestAction;

    //Clean up arrays with only one element
    for(var prop in billCopy){
      if (billCopy.hasOwnProperty(prop) && typeof billCopy[prop] == "object" &&  billCopy[prop].length == 1 && typeof billCopy[prop][0] == "string"){
        billCopy[prop] = billCopy[prop][0];
        if(!isNaN(billCopy[prop]) && billCopy[prop].length > 0) billCopy[prop] = parseInt(billCopy[prop]); //Parse all number strings into numbers
      }
    }

    //TODO: Make sure none of the following throw errors for all objects

    //Clean up verbose JSON elements
    if("name" in billCopy.policyArea[0]) billCopy.policyArea = billCopy.policyArea[0].name[0]; //Clean up policyArea

    if("billSubjects" in billCopy.subjects[0] && "legislativeSubjects" in billCopy.subjects[0].billSubjects[0]) billCopy.subjects = billCopy.subjects[0].billSubjects[0].legislativeSubjects[0].item.map(function(element){
      return element.name[0];
    }); //Convert the entire subjects JSON object into a more manageable array

    billCopy.summaries = billCopy.summaries[0].billSummaries[0];
    if(typeof billCopy.summaries == "object") billCopy.summaries = billCopy.summaries.item[0].text[0].replace(/<\/?[^>]+>/g, "").trim(); //Replace the summary object with a simple string

    billCopy.relatedBills = billCopy.relatedBills.map(function(element){
      element = element.item[0];
      delete element.relationshipDetails;
      convertArraysToString(element);
      return element;
    }); //Trim related bills

    billCopy.committees = billCopy.committees[0].billCommittees.map(function(element){
      convertArraysToString(element.item);
      delete element.item[0].systemCode;
      return element.item[0];
    }); //Trim committees

    billCopy.cosponsors = billCopy.cosponsors[0].item.map(function(element){
      convertArraysToString(element);
      delete element.lastName;
      delete element.firstName;
      delete element.state;
      delete element.party;
      delete element.middleName;
      delete element.bioguideId;
      delete element.identifiers;
      return element;
    }); //Trim cosponsors

    billCopy.sponsors = billCopy.sponsors[0].item.map(function(element){
      convertArraysToString(element);
      delete element.lastName;
      delete element.firstName;
      delete element.state;
      delete element.party;
      delete element.middleName;
      delete element.bioguideId;
      delete element.identifiers;
      return element;
    }); //Trim sponsors

    billCopy.titles = billCopy.titles[0].item.map(function(element){
      convertArraysToString(element);
      return element;
    }); //Trim titles

    billCopy.actions = billCopy.actions[0].item.map(function(element){
      convertArraysToString(element);
      return element;
    }); //Trim titles

    callback(billCopy);
  }
  catch(e){
    throw new Error("JSON supplied must be a valid bill");
  }
};

module.exports = cleanBillStatus;
