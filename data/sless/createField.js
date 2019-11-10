
/**
  * 
  * @param {number} from_typ 
  * @param {number} synonym 
  * @param {number} typ 
  * @param {string} beschreibung 
  * @returns {field}
*/ 
exports.fun = function createField(from_typ, synonym, typ, beschreibung) {
  return {
    from_typ: from_typ,
    synonym: synonym,
    typ: typ,
    beschreibung: beschreibung
  }
}
