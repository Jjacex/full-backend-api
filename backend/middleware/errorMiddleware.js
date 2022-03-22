//middleware are functions which execute during the request / response cycle
const errorHandler = (err, req, res, next) => {
    console.log("running error handler middleware".red)
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}

module.exports = errorHandler