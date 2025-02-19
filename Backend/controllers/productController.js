const Seller = require("../models/SellerShop");
const Warranty = require("../models/WarrantyShop");
const Specifications= require("../models/SpecificationsShop");
const Brands = require("../models/BrandsShop");
const Category = require("../models/CategoryShop");
const SubSpecifications= require("../models/SubSpecificationsShop");
const Product= require("../models/ProductShop");
const ProductAttribute= require("../models/ProductAttribute");
const ProductDetails=require("../models/ProductDetails");
/******************************** */
exports.handleSaveSeller = async (req, res, next) => {
     
    //console.log(req.body);
    
    try {
       

        const { title, label,category} = req.body;
       
        let seller; let messagetxt = "";
        
        seller = new Seller({

                title,
                label,
                category,
                
                status: "raw"
                
            });
         
            
          const selleradd=  await seller.save();

          
           
            messagetxt = "Save Successfully.";
            res.status(200).json({ message: messagetxt,selleradd:selleradd });
                
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
};
/***************************************** */
exports.handleGetAllSeller = async (req, res) => {
   //console.log(req.body);
    try {
               
        const allseller= await Seller.find({category:req.body.parent})
          
            .sort({
                createdAt: "desc",
            });

        res.status(200).json({ allseller });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err);
        }
        next(err);
    }

}; 
/********************************** */
exports.handleUpdateSeller = async (req, res) => {
    console.log(req.body);
    try {
        const { title, label,id} = req.body;
        const result = await Seller.findByIdAndUpdate(id, { title: title,label:label });

        
        messagetxt = "Edit Successfully.";
        res.status(200).json({ message: messagetxt,result:result });
    } catch (err) {
        console.log(err);
        err.statusCode = 500;
    }
};

/******************************** */
exports.handleSaveWarranty = async (req, res, next) => {
     
    //console.log(req.body);
    
    try {
       

        const { title, label} = req.body;
       
        let warranty; let messagetxt = "";
        
        warranty = new Warranty({

                title,
                label,
                status: "raw"
                
            });
         
            
          const result=  await warranty.save();

          
           
            messagetxt = "Save Successfully.";
            res.status(200).json({ message: messagetxt,result:result });
                
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
};
/***************************************** */
exports.handleGetAllWarrenty = async (req, res) => {
    // console.log(req.body);
     try {
                
         const allwarranty= await Warranty.find({})
           
             .sort({
                 createdAt: "desc",
             });
 
         res.status(200).json({ allwarranty });
         
 
     } catch (err) {
 
         if (!err.statusCode) {
             err.statusCode = 500;
             console.log(err);
         }
         next(err);
     }
 
 }; 
 /***************************************** */
exports.handleGetAllProductDepend = async (req, res,next) => {
   // console.log(req.body);
     try {
                
     
       const allcategory = await Category.find({parent: req.body.categoryId})
         const allspecifications = await Specifications.find({category:req.body.categoryId}) 
         const allbrands = await Brands.find({category:req.body.categoryId})    
        
         for(let  i=0;i<allspecifications.length;i++){
                const allsubspecifications = await SubSpecifications.find({spec:allspecifications[i]._id})
            
              allspecifications[i] = allspecifications[i].toObject();
              allspecifications[i].details = allsubspecifications;
         
            } 
      
      //  console.log(allspecifications);
         res.status(200).json({ allspecifications,allbrands,allcategory });
        
 
     } catch (err) {
 
         if (!err.statusCode) {
             err.statusCode = 500;
             console.log(err);
         }
         next(err);
     }
 
 }; 
 /************************************************ */
 exports.handleSaveProduct = async (req, res, next) => {
     
  
    try {
       

        const { fname, ename,category,brand,description,original,images} = req.body;
       
        attribute=await SaveProductAttribute(req.body.attribute);
        details=await SaveProductDetails(req.body.details);
      
    
     /*   if(attribute.length==0 || details.length==0){ 
          messagetxt = "Error In Save Attributes Or Details.";
          res.status(201).json({ message: messagetxt })
       } */
        let product;
          product = new Product({

                fname,
                ename,
                category,
                attribute,
                details,
                brand,
                description,
                original,
                images,
                status: "raw"
                
            });
         
            
          const productadd=  await product.save();

          
           
            messagetxt = "Save Successfully.";
            res.status(200).json({ message: messagetxt,productadd:productadd });
                
    } catch (err) {
         await DeleteProductAttribute(req.body.attribute);
         await DeleteProductDetails(req.body.details);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
};
/************************ */
let SaveProductAttribute = async (attributes) => {
     
 // console.log(attributes);
    
    try {

        const arr=[];
        for(let  i=0;i<attributes.length;i++){
            const element=attributes[i];
        
         let productattribute;let messagetxt = "";
               
         productattribute = new ProductAttribute({

                seller:element.seller,
                warranty:element.warranty,
                color:element.color,
                price:element.price,
                stock:element.stock,
                discount:element.discount,
                status: "raw"
                
            });
         
            
          const productattributeadd=  await productattribute.save();
          arr[i]=productattributeadd._id
        } 
           
    return arr;        
                
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
       
    }  
};
/************************ */
let SaveProductDetails = async (details) => {
     
    // console.log(details.length);
       
       try {
   
           const arr=[];
           for(let  i=0;i<details.length;i++){
               const element=details[i];
            
            let productdetails;
                  
            productdetails = new ProductDetails({
              
                   p_details:element.p_details,
                   value:element.value,
                   label:element.label,
                   status: "raw"
                   
               });
            
               
             const productdetailsadd=  await productdetails.save();
             arr[i]=productdetailsadd._id
           } 
               
       return arr;        
                   
       } catch (err) {
           if (!err.statusCode) {
               err.statusCode = 500;
           }
          
       }  
   };
   /********************* */
let DeleteProductDetails = async (details) => {
   
           for(let  i=0;i<details.length;i++){
               const element=details[i];
               await ProductDetails.deleteMany(element);
           
           } 
              
       return ;        
                   
      
   };
   /********************* */

let DeleteProductAttribute = async (attributes) => {
    for(let  i=0;i<attributes.length;i++){
        const element=attributes[i];
        await ProductAttribute.deleteMany(element);
    
    } 
       
return ;        
            

};
/***************************************** */
exports.handleGetAllProducts = async (req, res) => {
     //console.log(req.body);
     try {
        const attributeDetails=[];
         const getProduct= await Product.find({})
        
             .sort({
                 createdAt: "desc",
             });
             for(let  i=0;i<getProduct.length;i++){ 
               // brandDetails= await Brands.findById({_id:getProduct[i].brand})
                categoryDetails= await Category.findById({_id:getProduct[i].category})    
              getProduct[i] = getProduct[i].toObject();
            //  getProduct[i].brandDetails = brandDetails;
              getProduct[i].categoryDetails = categoryDetails;
             
                    arrattr= getProduct[i].attribute;
                   for(let  j=0;j<arrattr.length;j++){ 
                        attributeDetails[j]= await ProductAttribute.findById({_id:arrattr[j]})
                        sellerDetails= await Seller.findById({_id:attributeDetails[j].seller})
                        warrentyDetails= await Warranty.findById({_id:attributeDetails[j].warranty})

                        attributeDetails[j]= attributeDetails[j].toObject();
                        attributeDetails[j].sellerDetails=sellerDetails;
                        attributeDetails[j].warrentyDetails=warrentyDetails;
                    }//j 
             // console.log(attributeDetails);
              getProduct[i].attributeDetails = attributeDetails;
            } //i
      
         res.status(200).json({ getProduct });
         
 
     } catch (err) {
 
         if (!err.statusCode) {
             err.statusCode = 500;
             console.log(err);
         }
        
     }
 
 }; 