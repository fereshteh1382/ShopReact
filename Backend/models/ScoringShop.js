const { text } = require("body-parser");
const mongoose = require("mongoose");

//const { schema } = require("./secure/categoryValidation");

const ScoringShopSchema = new mongoose.Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryShop',
        required: true
       },

    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
   
        
   
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

/*categoryShopSchema.statics.categoryValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}; */


module.exports = mongoose.model("ScoringShop", ScoringShopSchema);
