const chalk = require('chalk');
function error_handler(err, req, res, next) {
    const dev_mode=req.app.get("global_arguments").dev;
    console.log(`${chalk.red("=========================================")}`)
    console.log(`Server ${chalk.bold.bgBlack.redBright("Error")} : `, err)
    console.log(`${chalk.red("=========================================")}`)
    res.status(500).send({ status: 500, data: dev_mode ? `${err}` : "something went wrong" })
}

module.exports = error_handler