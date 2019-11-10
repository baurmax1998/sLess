
/**
  * with promise
  * @param {string} aPath 
  * @returns {string}
*/ 
exports.fun = function readFile(aPath) {
  return new Promise(resolve => {
    fs.readFile(aPath, "utf8", function (err, text) {
      handleError(err);
      resolve(text);
    });
  })
}
