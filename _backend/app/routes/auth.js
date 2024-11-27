const app = require("express").Router();

app.use((req, res, next) => {
    next()
})

module.exports = app;