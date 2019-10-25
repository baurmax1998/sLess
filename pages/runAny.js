
function runAny(meta) {
  var Sqrl = require("squirrelly");
  Sqrl.autoEscaping(false)

  var fs = require('fs');
  var dir = './tmp';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var package = writeFile("./tmp/package.json", `{
    "name": "tmp",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo Error: no test specified && exit 1"
    },
    "author": "",
    "license": "ISC"
  }`)

  let indexjsTempl = `
  var fs = require('fs');

  Object.prototype.isTyp = function (fields) {
    var keys =  Object.keys(this)
    return fields.every(function(field){return keys.includes(field)})
  };

  Object.prototype.wrap = function () {
    return wrap(this)
  };

  let Types = {{typesString}}

  function wrap(object){
{{each(options.funs)}}
    if(object.isTyp(Types[{{@this.typ}}].fields))
      {{@this.name}}()
{{/each}}
  }
  
{{each(options.funs)}}
  eval(fs.readFileSync(__dirname+'/../data/express/{{@this.path}}')+'');
{{/each}}


  main()
  `

  var allFuns = getAllFuns()
  var allSynonyms = getAllSynonyms()
  var allFields = getAllFields()

  var synonymsToTyp = Stream(allSynonyms).groupBy("typ")

  var fieldsToTyp = Stream(allFields)
  .map(function (field) {
    field.name = findSynonymById(field.synonym)[0].name
    field.typname = findSynonymForTyp(field.typ)[0].name
    return field;
  })
  .groupBy("from_typ")

  var Types = {}
  for(var key in fieldsToTyp){
    Types[key] = {
      names: synonymsToTyp[key],
      fields: fieldsToTyp[key]
    }
  }




  var indexjs = Sqrl.Render(indexjsTempl, {
    funs: allFuns,
    typesString: JSON.stringify(Types)
  })


  

  writeFile("./tmp/index.js", indexjs)
  console.log(indexjs)

  // const { spawn } = require('child_process');
  // const debugg = spawn('node', ['./tmp/index.js']);

  // debugg.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

  // debugg.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });

  // debugg.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });

}

// //Load HTTP module
// const http = require("http");
// const hostname = '127.0.0.1';
// const port = 3000;

// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {

//   //Set the response HTTP header with HTTP status and Content type
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



// const { spawn } = require('child_process');
// const debugg = spawn('rawkit', ['--inspect-brk', 'any.js']);

// debugg.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// debugg.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// debugg.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });