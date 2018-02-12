/**
 * Asynchronously combines all the text fields from cleanBill.js into a more manageable JSON object
 * @param {object} bill - JSON bill (result from cleanBill.js)
 * @param {function} callback - Callback
 * @return {object} - JSON result
 * @example
 * getBill("BILLSTATUS-115hr99", function(res){
 *   printBill(res, function(parsedResult){
 *
 *   });
 * });
 */

 function recursivelyGenerateBody(body){
   var result = "";

   for(var i = 0; i < body.length; i++){
     for(var key in body[i]) {

       if(typeof body[i][key] == "object"){
         result += recursivelyGenerateBody(body[i][key]) + "\n";
       }
       else{
         switch(key){
           case "enum":
              result += body[i][key] + " ";
              break;
           case "header":
           case "text":
              result += body[i][key] + "\n";
              break;
         }
       }

     }
   }

   return result;
 }

var printBill = function(bill, callback){
  if(typeof bill != "object") throw new TypeError("'bill' needs to be an object");
  if(callback == null) throw new TypeError("A callback needs to be included");

  try{
    var res = {
      head: bill.head,
      body: recursivelyGenerateBody(bill.body).replace(/\n{2,}/g, "\n"),
    };

    callback(res);
  }
  catch(e){
    throw new Error("JSON supplied must be a valid bill");
  }
};

module.exports = printBill;
