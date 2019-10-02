const fs = require("fs");
const parser = require("jsdoc3-parser");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
let todos = [];


async function loadScripts() {
  let scriptPath = "./data/scripts/"
  let paths = await readPaths(scriptPath)
  var ret = [];
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    let doc = await parseDoc(scriptPath + path);
    if (doc == null || doc.undocumented) {
      todos.push("Das Script: " + path + " konnte nicht mit JSDoc gelesen werden!!")
      continue;
    }
    var meta = {
      name: doc.name,
      description: doc.description,
      params: doc.params,
      returns: doc.returns,
      path: doc.meta.path + "/" + doc.meta.filename,
    };
    let paramsTyp = addTypeWithName(meta.name + "able");
    for (let i = 0; i < meta.params.length; i++) {
      const param = meta.params[i];
      let typOfParam = findTypForSynonym( param.type.names[0])[0].typ;
      let synonym = addOrGetSynonym(typOfParam, param.name);
      add(tables.field, field(paramsTyp, synonym, typOfParam, param.description))
    }
    let typOfReturn = findTypForSynonym(meta.returns[0].type.names[0])[0].typ;

    add(tables.fun, fun(paramsTyp, typOfReturn, meta.name, meta.description, path))
    ret.push(meta);
  }
  return ret;
}



$(document).ready(async function () {
  $("#main").hide();
  $("#code_editor").hide();
  $("#query_editor").hide();
  $("#type_editor").hide();

  // databaseReadyAndFilledWithDefaults();
  // let scripts = await loadScripts()
  $("#code_editor").hide();
  addFunction("userf", "red", "fa-user");
  addFunction("searchf", "green", "fa-search");
  addFunction("editf", "purple", "fa-edit");
  $("#editf").on("click", function () {
    $("#main").hide();
    $("#code_editor").show();
  });
  $("#searchf").on("click", function () {
    $("#main").show();
    $("#code_editor").hide();
  });
  

  // initDemo(scripts);
  initEditor("square");
  // initQueryBuilder();
})

function handleError(err) {
  if (err) return console.error(err);
}


