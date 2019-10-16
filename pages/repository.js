
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
let db = low(new FileSync('db.json'))
db.defaults({
  typ: [],
  synonym: [],
  synonym_typ: [],
  field: [],
  fun: [],
  count: 0
}).write();

var tables = {
  typ: "typ",
  synonym: "synonym",
  synonym_typ: "synonym_typ",
  field: "field",
  fun: "fun"
}

function add(tableName, object) {
  db.get(tableName)
    .push(object)
    .write()
}

function getAllSynonyms() {
  return getAll(tables.synonym);
}

function getAllFuns() {
  return getAll(tables.fun);
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

function findFunByName(name) {
  return db.get(tables.fun)
    .filter({ name: name })
    .value();
}

function findSynonymForTyp(type_id) {
  return db.get(tables.synonym)
    .filter({ typ: type_id })
    .value();
}

function findSynonymById(id) {
  return db.get(tables.synonym)
    .filter({ id: id })
    .value();
}

function findFieldsForTyp(type_id) {
  return db.get(tables.field)
    .filter({ from_typ: type_id })
    .value();
}

function findTypForSynonym(synonym) {
  return db.get(tables.synonym)
    .filter({ name: synonym })
    .value();
}

function findSynonymTypForTyp(typ_id) {
  let findFieldsForTyp = findFieldsForTyp(typ_id)
  return findSynonymTypForFields(findFieldsForTyp);

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


function databaseReadyAndFilledWithDefaults() {
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
  addTypeWithName("number")
  addTypeWithName("string")
}

function addOrGetSynonym(typ, name) {
  let currentSynonym = db.get(tables.synonym)
    .filter({
      typ: typ,
      name: name
    }).value();
  let id = getId(tables.synonym);
  if (currentSynonym.length == 0) {
    add(tables.synonym, synonym(typ, name, id))
  } else {
    id = currentSynonym[0].id;
  }
  return id;
}

function addTypeWithName(name) {
  var id = getId(tables.typ);
  add(tables.typ, typ(id))
  add(tables.synonym, synonym(id, name, getId(tables.synonym)))
  return id;
}


async function addScript(name, code) {
  var fileName = name + ".js";
  var fin = await writeFile(scriptPathConfig + fileName, code)
  loadScript(fileName);
}

async function loadScripts() {
  databaseReadyAndFilledWithDefaults();
  let scriptPath = scriptPathConfig
  let paths = await readPaths(scriptPath)
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    loadScript(path)
  }
  console.log("scripts loaded")
}

async function loadScript(fileName) {
  let doc = await parseDoc(scriptPathConfig + fileName);
  if (doc == null || doc.undocumented) {
    todos.push("Das Script: " + fileName + " konnte nicht mit JSDoc gelesen werden!!")
    return;
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
    let typOfParam = findTypForSynonym(param.type.names[0])[0].typ;
    let synonym = addOrGetSynonym(typOfParam, param.name);
    add(tables.field, field(paramsTyp, synonym, typOfParam, param.description))
  }
  var returns = meta.returns;
  if (returns) 
   returns = findTypForSynonym(returns[0].type.names[0])[0].typ;
  add(tables.fun, fun(paramsTyp, returns, meta.name, meta.description, fileName))
}