
/**
  * works with promise
  * @param {string} path 
  * @returns {string[]}
*/ 
exports.fun = function readPaths(path) {
  return new Promise(resolve => {
    fs.readdir(path, function (err, files) {
      handleError(err);
      resolve(files);
    });
  });
}
