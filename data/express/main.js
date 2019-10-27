/**
  * startpoint
  */ 
exports.fun = function main() {
  console.log("main got runned!!")
  var res = ({ project: { path: "hallo" }, debug: true }).wrap().run()
  // ({"hallo":"welt"}).wrap().expand({"more": "param"}).log()
}
