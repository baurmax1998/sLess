
/**
  * extends posibilitys for autocomplete
  * @param {posibility[]} posibilitys 
  * @returns {posibility[]}
*/ 
exports.fun = function addFuns(posibilitys) {
  for (let i = 0; i < scope.funs.length; i++) {
    const fun = scope.funs[i];
    fun.action = "call"
    fun.info = "fun()"
    posibilitys.push(fun)
  }
  return posibilitys;
}
