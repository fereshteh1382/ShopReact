const { text } = require("body-parser");
const mongoose = require("mongoose");

//const { schema } = require("./secure/categoryValidation");

const ProductDetailsSchema = new mongoose.Schema({

    p_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSpecificationsShop',
       // required: true
       },

    value: {
        type: String,
       // required: true
    },
    label: {
        type: String,
       
    },
   
        
   
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

/*categoryShopSchema.statics.categoryValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}; */


module.exports = mongoose.model("ProductDetails", ProductDetailsSchema);
