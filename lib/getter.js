/**
 * Accesses bill data as a JSON
 * @param {string} billType - The type of bill (all, hr, s, hres, hjres, hconres, sconres, sjres, sres)
 * @param {object} options - Options
 * @return {object} - JSON result
 */

module.exports = function(billType, options){
  options = options || {};
  if(typeof billType != "string") throw new TypeError("'billType' needs to be a String");

};
