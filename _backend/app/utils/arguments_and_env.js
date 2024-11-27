const fs = require("fs");
const path = require("path");
const commandLineArgs = require('command-line-args');
const help = require("./help.js")
const chalk = require("chalk");
// this scripts implements command line arguments
// and npm module "command-line-args"

const default_data = JSON.parse(fs.readFileSync(path.join(__dirname, "../defaults.json"), "utf-8"));

function apply_env_variables(options) {
    // console.log("applying env variables");
    // console.log("processing enviroment variables");
    // ssl
    if (process.env.SSL) {
        options.https = true;
    }
    // port
    if (process.env.PORT) {
        try {
            const port = Number.parseInt(process.env.PORT);
            if (!port) {
                console.log(`${chalk.redBright.bold("Error ")}:  env variable "${chalk.bold.rgb(0, 255, 255)("PORT")}" must be a integer`);
                process.exit(2);
            }
            options.port = port;
        } catch (err) {
            // if port is not integer
            console.log(`${chalk.redBright.bold("Error ")}:  env variable "${chalk.bold.rgb(0, 255, 255)("PORT")}" must be a integer`)

        }
    }
    // development
    if (process.env.DEV === "true") {
        options.dev = true
    }
    // spa
    if (process.env.SPA) {
        options.spa = true;
        if (process.env.SPA === "true") {
            // apply default server end point
            options.server_end_point = default_data.server_end_point;
        } else {
            options.server_end_point = process.env.SPA
        }
    }
    return options
}

function apply_missing_data(options) {
    // console.log("applying missing data")
    // if port is not provided
    // if port is not set
    if (!options.port) {
        console.log("applying missing port")
        if (options.https) {
            options.port = default_data.https_port;
        } else {
            options.port = default_data.http_port;
        }
    }
    // applying default server_end_point if not provided
    if (options.spa) {
        if (!options.server_end_point) {
            // if server_end_point not provided
            options.server_end_point = default_data.server_end_point
        }
    }

    // applying https and http if not provided
    if (!options.http&&!options.https){
        // if both http and https is not provided
        options.http=true;
    }

    return options
}


function arg() {
    const optionDefinitions = [
        { name: 'https', type: Boolean },
        { name: 'dev', alias: 'd', type: Boolean },
        { name: 'help', alias: 'h', type: Boolean },
        { name: "spa", type: Boolean },
        { name: "port", alias: "p", type: Number },
        { name: "server_end_point", alias: "e", type: String }
        // { name: 'src', type: String, multiple: true, defaultOption: true },
        // { name: 'timeout', alias: 't', type: Number }
    ]
    let options = commandLineArgs(optionDefinitions);
    // console.log("processing arguments", options)
    // applying env variables
    options = apply_env_variables(options);
    // applying missing data (variables)
    options = apply_missing_data(options);

    // console.log("final",options);
    
    if (options.help) {
        help();
        process.exit()
    }

    // process.exit()

    return options
}


module.exports = arg