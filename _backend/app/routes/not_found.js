const app = require("express").Router();
/**endpoints */
app.use((req, res, next) => {
    res.type('json').status(404).send(
        JSON.stringify({
            data: `${(req.url).slice(1, req.url.length)} Not Found.`,
            method: req.method
        })
    );
});
/**exporting */ module.exports = app;