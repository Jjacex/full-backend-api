const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB

//notes on this file after review
//I understand this file very well and I could rewrite it without much help
//the most challenging aspect is pulling in your mongouri from your .env file
//I have learned you must keep your .env in the root of your entire project
//this helps ensure you have access to it from the entire project
//mongoose is used here and it creates a simpler way to ensure mongodb is connected
//the biggest challenge I see here is authentication
//I know some mongoose functions are not processed through the validation you set in the model
//dealing with this and testing for this can be a challenge
//other than that, I feel confident here and could recreate this connection process with minimal difficulty