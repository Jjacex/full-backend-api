const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
        //each goal will be associated with a specific user
        //the json field below helps to specify this
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Goal", goalSchema)