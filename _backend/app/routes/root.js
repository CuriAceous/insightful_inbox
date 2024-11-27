const app = require("express").Router();
const Log=require("../utils/log.js");
const devlog = new Log("root", true);
const log = new Log("root");
app.get("/", (req, res, next) => {
    devlog.log("hola");
    log.log("server request received")
    res.send(`<h1>${JSON.stringify(req.app.get("global_arguments"))}</h1>`)
    log.elog("this is error log test",true,{name:"anurag",title:"vaibhav"})
    devlog.elog("this is a test dev log error")
});


// export the route
module.exports = app