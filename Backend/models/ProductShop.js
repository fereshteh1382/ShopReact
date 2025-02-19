const { text } = require("body-parser");
const mongoose = require("mongoose");

//const { schema } = require("./secure/categoryValidation");

const ProductShopSchema = new mongoose.Schema({

    
    fname: {
        type: String,
        required: false
    },
    ename: {
        type: String,
        required: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryShop',
       // required: true
       },
     
     attribute: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductAttribute',
       }],
     details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductDetails',
       }],  
     brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BrandShop',
       // required: true
       },  
       
    description: {
        type: String,
       },
        
    
    original: {
        type: String,
       },   
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Multimedia',
       },           
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

/*categoryShopSchema.statics.categoryValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}; */


module.exports = mongoose.model("ProductShop", ProductShopSchema);
