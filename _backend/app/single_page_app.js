const app = require("express").Router();
const server = require("./routes/root.js");
const { existsSync } = require('fs');
const path = require("path");
const arg=require("./utils/arguments_and_env.js")

const arg_env=arg();
function getEndPoint() {
    return arg_env.server_end_point;
}

// single page application
app.get("*", (req, res, next) => {
    console.log(req.url)
    if (req.url.split("/")[1] === getEndPoint()) {
        // if url matches for server endpoint
        next()
    }
    else if (req.url === "/") {
        res.sendFile(path.join(__dirname, "../spa_frontend/index.html"))
    }
    else if (existsSync(path.join(__dirname, "../spa_frontend/" + req.url))) {
        // if file exists in the frontend then send it
        res.sendFile(path.join(__dirname, "../spa_frontend/" + req.url))
    } else {
        res.sendFile(path.join(__dirname, "../spa_frontend/index.html"))
    }

})
// running server on other endpoint than root
app.use(`/${getEndPoint()}`, server);

module.exports = app