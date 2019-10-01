







function readPaths(path) {
  return new Promise(resolve => {
    fs.readdir(path, function (err, files) {
      handleError(err);
      resolve(files);
    });
  });
}


function readFile(aPath) {
  return new Promise(resolve => {
    fs.readFile(aPath, "utf8", function (err, text) {
      handleError(err);
      resolve(text);
    });
  })
}

function writeFile(aPath, aText) {
  return new Promise(resolve => {
    fs.writeFile(aPath, aText, "utf8", function (err) {
      handleError(err);
      resolve('saved!');
    });
  });
}


function parseDoc(aPath) {
  return new Promise(resolve => {
    parser(aPath, function (err, docs) {
      handleError(err);
      for (let doc of docs) {
        if (doc.meta != undefined && doc.meta.filename.split(".")[0] == doc.name) {
          resolve(doc);
          return;
        }
      }
      resolve(null)
    });
  })
}
