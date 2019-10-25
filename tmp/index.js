
  var fs = require('fs');

  Object.prototype.isTyp = function (fields) {
    var keys =  Object.keys(this)
    return fields.every(function(field){return keys.includes(field)})
  };

  Object.prototype.wrap = function () {
    return wrap(this)
  };

  let Types = {"4":{"names":[{"typ":4,"name":"AppConfig","id":4},{"typ":4,"name":"config","id":14}],"fields":[{"from_typ":4,"synonym":5,"typ":1,"name":"name","typname":"string"},{"from_typ":4,"synonym":6,"typ":2,"name":"frontend","typname":"bool"},{"from_typ":4,"synonym":8,"typ":5,"name":"routings","typname":"Array.<object>"},{"from_typ":4,"synonym":9,"typ":0,"name":"port","typname":"number"}]},"7":{"names":[{"typ":7,"name":"NodejsProject","id":11},{"typ":7,"name":"project","id":16}],"fields":[{"from_typ":7,"synonym":12,"typ":1,"beschreibung":"folder with the name of the projekt","name":"path","typname":"string"}]},"8":{"names":[{"typ":8,"name":"buildable","id":13}],"fields":[{"from_typ":8,"synonym":14,"typ":4,"name":"config","typname":"AppConfig"}]},"9":{"names":[{"typ":9,"name":"runable","id":15}],"fields":[{"from_typ":9,"synonym":16,"typ":7,"name":"project","typname":"NodejsProject"},{"from_typ":9,"synonym":17,"typ":2,"beschreibung":"starts the depugger","name":"debug","typname":"bool"}]},"10":{"names":[{"typ":10,"name":"logable","id":18}],"fields":[{"from_typ":10,"synonym":19,"typ":3,"name":"toLog","typname":"object"}]}}
  function wrap(object){
    if(object.isTyp(Types[undefined].fields))
      main()
    if(object.isTyp(Types[undefined].fields))
      build()
    if(object.isTyp(Types[undefined].fields))
      run()
    if(object.isTyp(Types[undefined].fields))
      log()
  }
  
  eval(fs.readFileSync(__dirname+'/../data/express/main.js')+'');
  eval(fs.readFileSync(__dirname+'/../data/express/build.js')+'');
  eval(fs.readFileSync(__dirname+'/../data/express/run.js')+'');
  eval(fs.readFileSync(__dirname+'/../data/express/log.js')+'');


  main()
  