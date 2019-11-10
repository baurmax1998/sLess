
/**
  * extends posibilitys for autocomplete
  * @param {posibility[]} posibilitys 
  * @returns {posibility[]}
*/ 
exports.fun = function addStandarts(posibilitys) {
  posibilitys = posibilitys.concat([{
    name: ".var",
    info: "any",
    action: "var"
  }, {
    name: "return",
    info: "key",
    action: "key"
  }, {
    name: ".calc",
    info: "math",
    action: "calc"
  }]);

  return posibilitys;
}
