const { text } = require("body-parser");
const mongoose = require("mongoose");

//const { schema } = require("./secure/categoryValidation");

const categoryShopSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    description: { type: String },
    parent: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        //ref: 'CategoryShop',
        //  required: true
    },
    /*image: { type: Schema.Types.ObjectId,
        ref: 'Multimedia', required: true
    },*/
    thumbnail: {
        type: String,
        // required: true,
    },
    /* user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
     },*/
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

/* categoryShopSchema.statics.categoryValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}; */

module.exports = mongoose.model("CategoryShop", categoryShopSchema);
