

setTimeout(function () {  
  var fs = require('fs');

  global.build = require( __dirname + '/../data/express/build.js').fun;
  global.run = require( __dirname + '/../data/express/run.js').fun;
  global.main = require( __dirname + '/../data/express/main.js').fun;

  var jsparser = require(__dirname + '/../lib/esprima/esprima.js').parse
  global.Types = {"4":{"names":[{"typ":4,"name":"AppConfig","id":4},{"typ":4,"name":"config","id":13}],"fields":[{"from_typ":4,"synonym":5,"typ":1,"name":"name","typname":"string"},{"from_typ":4,"synonym":6,"typ":2,"name":"frontend","typname":"bool"},{"from_typ":4,"synonym":8,"typ":5,"name":"routings","typname":"Array.<object>"},{"from_typ":4,"synonym":9,"typ":0,"name":"port","typname":"number"}]},"6":{"names":[{"typ":6,"name":"NodejsProject","id":10},{"typ":6,"name":"project","id":15}],"fields":[{"from_typ":6,"synonym":11,"typ":1,"beschreibung":"folder with the name of the projekt","name":"path","typname":"string"}]},"7":{"names":[{"typ":7,"name":"buildable","id":12}],"fields":[{"from_typ":7,"synonym":13,"typ":4,"name":"config","typname":"AppConfig"}]},"8":{"names":[{"typ":8,"name":"runable","id":14}],"fields":[{"from_typ":8,"synonym":15,"typ":6,"name":"project","typname":"NodejsProject"},{"from_typ":8,"synonym":16,"typ":2,"beschreibung":"starts the depugger","name":"debug","typname":"bool"}]}}
  Object.prototype.isTyp = function (fields) {
    var keys =  Object.keys(this)
    return fields.every(function(field){return keys.includes(field.name)})
  };

  Object.prototype.wrap = function () {
    return wrap(this)
  };

  global._ = function(ob){
    return wrap(ob)
  }

  Object.prototype.expand = function (update) {
    for(var key in update){
      this[key] = update[key];
    }
    return wrap(this)
  };

  function wrapOne(object, typId, name) {
    const typ = Types[typId]
    let fun = this[name]
    if(typ != undefined 
      && (
        object.isTyp(typ.fields) 
        || (typ.fields.length == 1 
          && (typ.fields[0].typname == "object"
          ||object.isTyp(Types[typ.fields[0].typ].fields))))){
      let params = jsparser(fun.toString(),{ tolerant: true }).body[0].params;
      if(params.length == 0){
        throw new Error("no Parameter Function can#t be attacht to objekt" + name);
      } else if(params.length == 1){
        object[name] = function () {
          var returns = fun(this)
          if (returns === undefined) {
            return this;
          } else {
            return _(returns)
          }
        }   
      } else {
        if(params.length == 2){
          //todo make it fluit
        }
        object[name] = function () {
          var paramValues = []
          for (let i = 0; i < params.length; i++) {
            const param = params[i];
            paramValues.push(this[param.name])
          }
          var returns = fun.apply(null, paramValues)
          if (returns === undefined) {
            return this;
          } else {
            return _(returns)
          }
        }
      }
    }
    
  }



  function wrap(object){
    wrapOne(object, 7, "build")
    wrapOne(object, 8, "run")
    wrapOne(object, 9, "main")
    return object;

  }
  
  debugger;
  main()
}, 1000);

  