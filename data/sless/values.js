
/**
  * 
  * @param {string} text 
  * @param {callback} cb 
  */ 
exports.fun = function values(text, cb) {
  var textWithoutFunc = text.split(".")[0]
  var posibilitys = [];
  posibilitys = addMethods(posibilitys, textWithoutFunc)
  posibilitys = addSynonyms(posibilitys)
  posibilitys = addStandarts(posibilitys)
  posibilitys = addVars(posibilitys, textWithoutFunc);
  posibilitys = addFuns(posibilitys)
  cb(posibilitys)
}
