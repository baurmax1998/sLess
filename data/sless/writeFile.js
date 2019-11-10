
/**
  * 
  * @param {string} aPath 
  * @param {string} aText 
  * @returns {string}
*/ 
exports.fun = function writeFile(aPath, aText) {
  return new Promise(resolve => {
    fs.writeFile(aPath, aText, "utf8", function (err) {
      handleError(err);
      resolve('saved!');
    });
  });
}
