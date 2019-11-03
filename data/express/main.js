/**
  * startpoint
  * console.log("main got runned!!")
    var res = ({ project: { path: "hallo" }, debug: true }).wrap().run()
  */
exports.fun = function main() {
    ({
        "name": "",
        "frontend": false,
        "routings": null,
        "port": 0
    }.build(undefined).run(undefined))
}