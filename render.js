const fs = require("fs");
const parser = require("jsdoc3-parser");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
var tables = {
  typ: "typ",
  synonym: "synonym",
  synonym_typ: "synonym_typ",
  field: "field",
  fun: "fun"
}

// Set some defaults (required if your JSON file is empty)
db.defaults({
  typ: [],
  synonym: [],
  synonym_typ: [],
  field: [],
  fun: [],
  count: 0
}).write()

function add(tableName, object) {
  // Add a post
  db.get(tableName)
    .push(object)
    .write()
}

function getAll(tableName) {
  return db.get(tableName).value();
}

function getId(tableName) {
  return db.get(tableName).size().value()
}

function typ(id) {
  return { id: id }
}

function synonym(typ, name, id) {
  return {
    typ: typ,
    name: name,
    id: id
  }
}

function synonym_typ(typ, kann_als_typ) {
  return {
    typ: typ,
    kann_als_typ: kann_als_typ
  }
}

function field(from_typ, synonym, typ, beschreibung) {
  return {
    from_typ: from_typ,
    synonym: synonym,
    typ: typ,
    beschreibung: beschreibung
  }
}

function fun(param, returns, name, beschreibung, path) {
  return {
    param: param,
    returns: returns,
    name: name,
    beschreibung: beschreibung,
    path: path
  }
}

function findSynonymTypForFields(fields) {
  let typesFromFields = Stream(fields)
    .map("typ")
    .toArray();
  let types = Stream(getAll(tables.field))
    .groupBy('from_typ');
  let synonym_typs = [];
  for (const typ in types) {
    const fields = types[typ];
    let wrongField = false;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      wrongField = !typesFromFields.includes(field.typ) || wrongField;
    }
    if (!wrongField) {
      synonym_typs.push(fieds)
    }
  }
  return synonym_typs;
}

function fieldsForTyp(type_id) {
  return db.get(tableName)
    .filter({ from_typ: type_id })
    .value();
}

function findSynonymTypForTyp(typ_id) {
  let fieldsForTyp = fieldsForTyp(typ_id)
  return findSynonymTypForFields(fieldsForTyp);

}

function findMethodsForType(type_id) {
  let synonym_typs = findSynonymTypForTyp(type_id)
  let allFunktions = getAll(tables.fun);
  return Stream(allFunktions).filter(function (fun) {
    return synonym_typs.includes(fun.param);
  })
}

function findConstructorForType(type_id) {
  let synonym_typs = findSynonymTypForTyp(type_id)
  let allFunktions = getAll(tables.fun);
  return Stream(allFunktions).filter(function (fun) {
    return synonym_typs.includes(fun.returns);
  })
}


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

function handleError(err) {
  if (err) return console.error(err);
}

function getScriptColor(meta) {
  var filterOptions = ['red', 'blue', 'green', 'orange'];
  const scriptTypes = {
    Function: "green",
    Consumer: "blue",
    Supplier: "orange",
    Runnable: "red"
  }
  if (meta.returns == []) {
    if (meta.params == []) {
      return scriptTypes.Runnable;
    } else {
      return scriptTypes.Consumer;
    }
  } else {
    if (meta.params == []) {
      return scriptTypes.Supplier;
    } else {
      return scriptTypes.Function;
    }
  }
}

function getScriptParams(params) {
  var paramsElement = $("<p>");
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    paramsElement.append(
      $("<span class='param'>").attr("title", param.description)
        .append($("<span>").text(param.name))
        .append($("<a href='#' class='w3-tag w3-round w3-green'>").text(param.type.names[0]))
    )
  }
  return paramsElement;
}

function getScriptReturn(returns) {
  return $("<p>")
    .append(
      $("<a href='#' class='w3-tag w3-round'>")
        .text(returns[0].type.names[0]))
}


async function loadScripts() {
  let scriptPath = "./data/scripts/"
  let paths = await readPaths(scriptPath)
  var ret = [];
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    let doc = await parseDoc(scriptPath + path);
    if (doc == null || doc.undocumented) {
      console.log(path + ": continued!")
      continue;
    }
    var meta = {
      name: doc.name,
      description: doc.description,
      params: doc.params,
      returns: doc.returns,
      path: doc.meta.path + "/" + doc.meta.filename,
    };
    ret.push(meta)
  }
  return ret;
}


$(document).ready(function () {
  let scripts = loadScripts()
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
  $("#main").hide();
  $("#code_editor").hide();
  $("#query_editor").hide();

  // initDemo(await scripts);
  // initEditor();
  // initQueryBuilder();
})

