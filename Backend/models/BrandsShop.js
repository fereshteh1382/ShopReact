const { text } = require("body-parser");
const mongoose = require("mongoose");

//const { schema } = require("./secure/categoryValidation");

const brandsShopSchema = new mongoose.Schema({

    title: {
        type: String,
       // required: true
    },
    label: {
        type: String,
        required: false
    },
   
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryShop',
       }],
   
    image: {
        type: String,
        // required: true,
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

/*categoryShopSchema.statics.categoryValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}; */


module.exports = mongoose.model("BrandsShop", brandsShopSchema);
