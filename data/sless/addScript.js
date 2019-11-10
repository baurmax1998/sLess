
/**
  * add script to file and db
  * @param {string} name 
  * @param {string} code 
  */
exports.fun = async function addScript(name, code) {
  var fileName = name + ".js";
  var fin = await writeFile(scriptPathConfig + fileName, code)
  let doc = await parseDoc(scriptPathConfig + fileName);
  loadScript(doc);
}
