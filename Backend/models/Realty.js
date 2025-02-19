const { text } = require("body-parser");
const mongoose = require("mongoose");

//const { schema } = require("./secure/customersfileValidation");

const realtySchema = new mongoose.Schema({

    fname: {
        type: String,

        trim: true,
        /* minlength: 5,
         maxlength: 100,*/
    },
    ename: {
        type: String,
        required: true,
        trim: true,

    },
    range: {
        type: String,
        required: true,
        trim: true,

    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },
    meterage: {
        type: String,
        required: true,
        trim: true,

    },
    images: {
        type: String,
        /*type: mongoose.Schema.Types.ObjectId,
        ref: 'Multimedia',
        required: true*/
    },
    price: {
        type: String,
        required: true,
        trim: true,

    },
    rooms: {
        type: String,
        default: "0",

    },
    yearconstruction: {
        type: String,
        default: "1402",
    },
    floor: {
        type: String,
        default: "0",
    },
    elevator: {
        type: String,
        default: "yes",

    },
    parking: {
        type: String,
        default: "yes",

    },
    warehouse: {
        type: String,
        default: "yes",

    },
    address: {
        type: String,
        required: false,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },
    desc: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Customers',

    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "private",
        enum: ["private", "public"],
    },

    /* 
     image: { type: Schema.Types.ObjectId,
         ref: 'Multimedia', required: true
     },*/
    thumbnail1: {
        type: String,

    },
    thumbnail2: {
        type: String,

    },
    thumbnail3: {
        type: String,

    },


});

/*customersfileSchema.statics.customersfileValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};*/

module.exports = mongoose.model("Realty", realtySchema);
