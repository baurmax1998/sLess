
/**
  * add typ to db
  * @param {object} doc 
  */ 
exports.fun = async function loadType(doc) {
  if (doc.kind == "typedef") {
    let typ = addTypeWithName(doc.name);
    let props = doc.properties ? doc.properties : [];
    for (let i = 0; i < props.length; i++) {
      const param = props[i];
      let typOfParam = findTypForSynonymOrCreate(param.type.names[0]).typ;
      let synonym = addOrGetSynonym(typOfParam, param.name);
      add(tables.field, createField(typ, synonym, typOfParam, param.description))
    }
  }
}
