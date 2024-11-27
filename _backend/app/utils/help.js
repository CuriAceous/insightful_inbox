// this prints out help docs to the teminal
const fs = require("fs");
const path = require("path");

function help() {
    const help_data =  fs.readFileSync(path.join(__dirname,"../help.txt"),"utf-8");
    const env_help=fs.readFileSync(path.join(__dirname,"../env_variables_help.txt"),"utf-8");
    console.log();
    console.log(help_data);
    console.log();
    console.log(env_help)
}

module.exports = help