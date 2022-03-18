const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const app = express()

connectDB()

//these lines of middleware allow us to grab info from the req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))

//pulling in our error handler middleware
// app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})