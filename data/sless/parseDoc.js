
/**
  * 
  * @param {string} aPath 
  * @returns {object}
*/ 
exports.fun = function parseDoc(aPath) {
  return new Promise(resolve => {
    parser(aPath, function (err, docs) {
      handleError(err);
      for (let doc of docs) {
        var name = doc.meta.filename.split(".")[0]
        if (doc.meta != undefined && (name == doc.name || "fun" == doc.name)) {
          doc.name = name;
          resolve(doc);
          return;
        }
      }
      resolve(null)
    });
  })
}
