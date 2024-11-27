const chalk = require("chalk");
const args = require("./arguments_and_env");

class Log {
    constructor(title, dev = false) {
        this.title = title;
        this.dev = dev;
        this.arg = args();
    }
    log(...log) {
        if (this.arg.dev && this.dev) {
            // development mode
            console.log(`${chalk.bold.magentaBright("# ") + chalk.rgb(0, 255, 255).bold(this.title)} :`, ...log);
        } else {
            // not development mode
            console.log(`${chalk.rgb(0, 255, 255).bold(this.title)} :`, ...log);
        }
    }
    elog(...log) {
        if (this.arg.dev && this.dev) {
            // development mode
            console.log(`${chalk.bold.magentaBright("# ")+chalk.rgb(0, 255, 255).bold(this.title)+chalk.bold.redBright(" err ")}:`,...log);
        } else {
            // not development mode
            console.log(`${chalk.rgb(0, 255, 255).bold(this.title)+chalk.bold.redBright(" err ")}:`,...log);
        }
    }
}
module.exports = Log