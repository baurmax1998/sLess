
/**
  * 
  */ 
exports.fun = function databaseReadyAndFilledWithDefaults() {
  db = null;
  fs.unlinkSync("./db.json");
  db = low(new FileSync('db.json'))
  db.defaults({
    typ: [],
    synonym: [],
    synonym_typ: [],
    field: [],
    fun: [],
    count: 0
  }).write();
  addTypeWithName("null")
  addTypeWithName("number")
  addTypeWithName("string")
  addTypeWithName("bool")
  addTypeWithName("object")
}
