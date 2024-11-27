const express = require("express");
const chalk = require("chalk")
const { readFile } = require("fs").promises
const https = require("https")
const path = require("path")

// routes
const not_found = require("./routes/not_found.js")
const error_handler = require("./routes/error_handler.js")
const auth = require("./routes/auth.js")
const server = require("./routes/root.js")
const spa_app = require('./single_page_app.js')
const arg = require("./utils/arguments_and_env.js");
// initializing express server
const app = express();
// auth
app.use(auth);
// ==================================
const arg_env = arg();
app.set("global_arguments",arg_env);
// ==================================
if (arg_env.spa) {
    // single page application
    app.use(spa_app)

} else {
    // server
    app.use(server)
}
// ==================================

// ==================================
// not found
app.use(not_found)
// error_handler
app.use(error_handler)


// =====================================
// RUNNING SERVER

async function launch_server() {
    try {

        const port = arg_env.port;
        console.clear();
        // reading variables.json file
        function launch_server_log() {
            let log = "";
            // Single page application
            log += `${arg_env.spa ? chalk.rgb(0, 255, 255).bold("SPA ") : ""}`;
            // SSL
            if (arg_env.https) { log += `${chalk.bold.rgb(0, 255, 255)("SSL")} `; }
            // live and port
            log += `Server ${chalk.bold.greenBright("Live")} on Port : ${chalk.bold.greenBright(port)} `;
            // server endpoint
            if (arg_env.spa) {
                log += chalk.yellow.bold(`( server_end_point : ${chalk.green(`/${arg_env.server_end_point}`)})`);
            }
            // development mode
            if (arg_env.dev){
                log += chalk.magentaBright.bold(` #dev `)
            }
                console.log(log)
        }
        if (arg_env.https) {
            // running https server
            //  ssl server
            const key = await readFile(path.join(__dirname, "../ssl_certificate/key.pem"), "utf-8");
            const certificate = await readFile(path.join(__dirname, "../ssl_certificate/cert.pem"), "utf-8");

            const ssl_server = https.createServer({
                key: key,
                cert: certificate
            }, app);

            ssl_server.listen(port, launch_server_log)

        } else {
            // running http server
            app.listen(port, launch_server_log);
        }


    } catch (err) {
        // error handler
        console.log(err)
    }
}
launch_server()

