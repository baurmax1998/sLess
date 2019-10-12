//Methods Primitives/object
Object.prototype.log = function () {
  log(this);
  return this;
};

Object.prototype.extend = function (callback) {
  return callback(this);
};

Number.prototype.myMethod = function () {
  return this.valueOf() + 1;
};

String.prototype.rFiles = function () {
  let files = rFiles(this);
  addFunctionsFiles(files);
  return files
};

//Methods Types
function addFunctionsFiles(obj) {
  obj.readText = function () {
      let text = readText(this);
      addFunctionsText(text);
      return text
  };
}

function addFunctionsText(obj){
  return obj;
}

//functions
function rFiles(some) {
  return {path: some}
}

function readText(file) {
  return {
      path: file.path,
      text: "hallo"
  }
}

function log(val) {
  console.log(val)
}

//realFunction
function code() {
  var filesWithAction = "./files"
      .rFiles()
      .readText()
      .extend(x => {
          x.action = "delete";
          return x;
      })
      .log()
  ;

  var test2 = "was".rFiles().readText().text.rFiles().log();
}
code();