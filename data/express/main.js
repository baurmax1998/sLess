/**
  * startpoint
  * console.log("main got runned!!")
    var res = ({ project: { path: "hallo" }, debug: true }).wrap().run()
  */
exports.fun = function main() {
    _({
        "name": "test",
        "frontend": true,
        "routings": null,
        "port": 8080
    }).build().run()
}