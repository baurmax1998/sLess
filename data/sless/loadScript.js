
/**
  * add script to db
  * @param {object} doc 
  */ 
exports.fun = async function loadScript(doc) {
  
  if (doc.kind != "typedef") {
    var meta = {
      name: doc.name,
      description: doc.description,
      params: doc.params ? doc.params: [],
      returns: doc.returns,
    };
    let paramsTyp = addTypeWithName(meta.name + "able");
    for (let i = 0; i < meta.params.length; i++) {
      const param = meta.params[i];
      let typOfParam = findTypForSynonymOrCreate(param.type.names[0]).typ;
      let synonym = addOrGetSynonym(typOfParam, param.name);
      add(tables.field, createField(paramsTyp, synonym, typOfParam, param.description))
    }
    var returns = meta.returns;
    if (returns)
      returns = findTypForSynonym(returns[0].type.names[0]).typ;
    add(tables.fun, createFun(paramsTyp, returns, meta.name, meta.description, doc.meta.filename))
  }
}
