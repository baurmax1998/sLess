
/**
  * load multiple scripts to db
  */ 
exports.fun = async function loadScripts() {
  databaseReadyAndFilledWithDefaults();
  let scriptPath = scriptPathConfig
  let paths = await readPaths(scriptPath)
  console.log(paths.length)
  let docs = []
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    let doc = await parseDoc(scriptPathConfig + path);
    if (doc == null || doc.undocumented) {
      todos.push("Das Script: " + fileName + " konnte nicht mit JSDoc gelesen werden!!")
      return;
    }
    docs.push(doc)
    loadType(doc)
  }
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    loadScript(doc)
  }
  console.log("scripts loaded")
}
