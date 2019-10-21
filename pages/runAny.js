
function runAny(meta) {
  console.log(meta)
  var fs = require('fs');
  var dir = './tmp';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var package =

    writeFile("./tmp/package.json", `{
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

  writeFile("./tmp/index.js", `
  console.log(__dirname)
  var fs = require('fs');
  eval(fs.readFileSync(__dirname+'/../data/express/main.js')+'');
  main()
  `)

  const { spawn } = require('child_process');
  const debugg = spawn('node', ['./tmp/index.js']);

  debugg.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  debugg.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  debugg.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

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