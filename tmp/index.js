

setTimeout(function () {  
  var fs = require('fs');

  global.main = require( __dirname + '/../data/express/main.js').fun;
  global.build = require( __dirname + '/../data/express/build.js').fun;
  global.run = require( __dirname + '/../data/express/run.js').fun;
  global.log = require( __dirname + '/../data/express/log.js').fun;

  var jsparser = require(__dirname + '/../lib/esprima/esprima.js').parse
  global.Types = {"4":{"names":[{"typ":4,"name":"AppConfig","id":4},{"typ":4,"name":"config","id":14}],"fields":[{"from_typ":4,"synonym":5,"typ":1,"name":"name","typname":"string"},{"from_typ":4,"synonym":6,"typ":2,"name":"frontend","typname":"bool"},{"from_typ":4,"synonym":8,"typ":5,"name":"routings","typname":"Array.<object>"},{"from_typ":4,"synonym":9,"typ":0,"name":"port","typname":"number"}]},"7":{"names":[{"typ":7,"name":"NodejsProject","id":11},{"typ":7,"name":"project","id":16}],"fields":[{"from_typ":7,"synonym":12,"typ":1,"beschreibung":"folder with the name of the projekt","name":"path","typname":"string"}]},"8":{"names":[{"typ":8,"name":"buildable","id":13}],"fields":[{"from_typ":8,"synonym":14,"typ":4,"name":"config","typname":"AppConfig"}]},"9":{"names":[{"typ":9,"name":"runable","id":15}],"fields":[{"from_typ":9,"synonym":16,"typ":7,"name":"project","typname":"NodejsProject"},{"from_typ":9,"synonym":17,"typ":2,"beschreibung":"starts the depugger","name":"debug","typname":"bool"}]},"10":{"names":[{"typ":10,"name":"logable","id":18}],"fields":[{"from_typ":10,"synonym":19,"typ":3,"name":"toLog","typname":"object"}]}}
  Object.prototype.isTyp = function (fields) {
    var keys =  Object.keys(this)
    return fields.every(function(field){return keys.includes(field.name)})
  };

  Object.prototype.wrap = function () {
    return wrap(this)
  };

  Object.prototype.expand = function (update) {
    for(var key in update){
      this[key] = update[key];
    }
    return wrap(this)
  };

  function wrapOne(object, typId, name) {
    const typ = Types[typId]
    let fun = this[name]
    if(typ != undefined && (object.isTyp(typ.fields) || (typ.fields.length == 1 && typ.fields[0].typname == "object"))){
      let params = jsparser(fun.toString(),{ tolerant: true }).body[0].params;
      if(params.length == 0){
        throw new Error("no Parameter Function can#t be attacht to objekt" + name);
      } else if(params.length == 1){
        object[name] = function () {
          var returns = fun(this)
          if (returns === undefined) {
            return this;
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
          }
        }
      }
    }
    
  }



  function wrap(object){
    wrapOne(object, 6, "main")
    wrapOne(object, 8, "build")
    wrapOne(object, 9, "run")
    wrapOne(object, 10, "log")
    return object;

  }
  
  debugger;
  main()
}, 1000);

  