const mongoose = require("mongoose")
const { Schema, model } = mongoose

const policySchema = new Schema({

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    url: {
        type: String,
        required: true,
    },

})

module.exports = model("Policy", policySchema)