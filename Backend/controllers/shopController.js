

const passport = require("passport");
const fetch = require("node-fetch");
const { storage, fileFilter } = require("../utils/multer");
const jwt = require("jsonwebtoken");

const multer = require('multer');
const sharp = require("sharp");
const Category = require("../models/CategoryShop");
const Brands = require("../models/BrandsShop");
const Scoring = require("../models/ScoringShop");
const Specifications= require("../models/SpecificationsShop");
const SubSpecifications= require("../models/SubSpecificationsShop");

exports.handleSaveCategory = async (req, res, next) => {
    //console.log(req.body);
    //res.status(200).json({ message: req.body.title });
    try {
       

        const { title, label, description,parent,thumbnail } = req.body;
       
        const categoryCount = await Category.findOne({ title });
        

        let category; let messagetxt = "";
        // if (userCount !== 0) {
        if (categoryCount) {
            
            messagetxt = "Exit Category With This Name!";
            res.status(201).json({ message: messagetxt });

        } else {
            category = new Category({

                title,
                label,
                description,
                parent,
                thumbnail,
                status: "raw"
                
            });
         
            
            await category.save();

          
           
            messagetxt = "Category Created.";
            res.status(200).json({ message: messagetxt });
        }

        
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    } 
};
/*************************** */


/******************************* */
exports.handleGetAllCategory = async (req, res) => {
//console.log(req.body);
    try {

        const allcategory = await Category.find({parent: req.body.parent})
            .sort({
                createdAt: "desc",
            });

        res.status(200).json({ allcategory });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

    /* const page = +req.query.page || 1;
    const postPerPage = 10;

    try {
        const numberOfPosts = await User.find({
            user: req.user._id,
        }).countDocuments();
        const allusers = await User.find({})
            .skip((page - 1) * postPerPage)
            .limit(postPerPage);

        res.render("private/allusersgroups", {
            pageTitle: "بخش مدیریت | کاربران",
            path: "/usersgroup/allusersgroup",
            layout: "./layouts/usersgroupLayout",

            allusers,

            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        });
    } catch (err) {
        console.log(err);
        
    }*/
}; 
/****************************** */
exports.handleGetAllCategoriez = async (req, res) => {
   
        try {
                   
            const allcategory = await Category.find({})
              
                .sort({
                    createdAt: "desc",
                });
    
            res.status(200).json({ allcategory });
            //console.log(allcustomers);
    
        } catch (err) {
    
            if (!err.statusCode) {
                err.statusCode = 500;
                console.log(err);
            }
            next(err);
        }
   
}; 
/******************************** */
exports.handleSaveBrands = async (req, res, next) => {
   // console.log(req.body);
    //res.status(200).json({ message: req.body.title });
     try {
       

        const { title, description,category,image } = req.body;
       
        let brands; let messagetxt = "";
        
        brands = new Brands({

                title,
                description,
                category,
                image,
                status: "raw"
                
            });
         
            
            await brands.save();

          
           
            messagetxt = "Brands Created.";
            res.status(200).json({ message: messagetxt });
                
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
};
/****************************** */
exports.handleGetAllBrands = async (req, res) => {
   
    try {
               
        const allbrands = await Brands.find({})
          
            .sort({
                createdAt: "desc",
            });

        res.status(200).json({ allbrands });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err);
        }
        next(err);
    }

}; 
/******************************** */
exports.handleSaveScoring = async (req, res, next) => {
     
      try {
        
        for(let index=0;index<req.body.data.length;index++)   {
            const element=req.body.data[index];
            //console.log(element);
          
          const category=element['category'];
          const name=element['name'];
          const label=element['label'];
          let scoring; let messagetxt = "";
          const categoryCount = await Category.find({parent: category})

       
         if (categoryCount == 0) {
                    
            messagetxt = "Not Exit Category With This Name!";
            res.status(201).json({ message: messagetxt }); 
         }else{
        
            scoring = new Scoring({
    
                   
                    category ,
                    name,
                    label,
                    status: "raw"
                    
                });
             
                
                await scoring.save();
                messagetxt = "Save Successfully.";
                res.status(200).json({ message: messagetxt }); 
          }  
        } 
            
           
            
                 
     } catch (err) {
         if (!err.statusCode) {
             err.statusCode = 500;
            
         }
         next(err);
     } 
 };
 /****************************** */
 exports.handleGetAllScoring = async (req, res) => {
    //console.log(req.body);
    try {
               
        const allscoring = await Scoring.find({category:req.body.categoryId})
          
            .sort({
                createdAt: "desc",
            });

        res.status(200).json({ allscoring });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err);
        }
        next(err);
    }

}; 
/******************************** */
exports.handleSaveSpecifications = async (req, res, next) => {
     
    //console.log(req.body);
    
    try {
       

        const { title, label,category} = req.body;
       
        let specifications; let messagetxt = "";
        
        specifications = new Specifications({

                title,
                label,
                category,
                
                status: "raw"
                
            });
         
            
          const spec=  await specifications.save();

          
           
            messagetxt = "Save Successfully.";
            res.status(200).json({ message: messagetxt,spec:spec });
                
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
};
/************************************************** */
exports.handleGetAllSpecifications = async (req, res) => {
    //console.log(req.body);
    try {
               
        const allspecifications = await Specifications.find({category:req.body.categoryId})
          
            .sort({
                createdAt: "desc",
            });

        res.status(200).json({ allspecifications });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err);
        }
        next(err);
    }

}; 
/******************************** */
exports.handleSaveSubSpecifications = async (req, res, next) => {
     
    console.log(req.body);
    
    try {
       

        const { title, label,spec} = req.body;
       
        let subspecifications; let messagetxt = "";
        
        subspecifications = new SubSpecifications({

                title,
                label,
                spec,
                
                status: "raw"
                
            });
         
            
          const subspec=  await subspecifications.save();

          
           
            messagetxt = "Save Successfully.";
            res.status(200).json({ message: messagetxt,subspec:subspec });
                
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
};
/************************************************** */
exports.handleGetAllSubSpecifications = async (req, res) => {
    console.log(req.body);
    try {
               
        const allsubspecifications = await SubSpecifications.find({spec:req.body.specsId})
          
            .sort({
                createdAt: "desc",
            });

        res.status(200).json({ allsubspecifications });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
            console.log(err);
        }
        next(err);
    }

}; 
/****************************** */
exports.deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndRemove(req.params.id);
        // console.log(result);
        //res.redirect("/users/allusers");
        res.status(200).json({ message: "ِDelete Success." });
    } catch (err) {
        console.log(err);
        //res.render("errors/500");
        err.statusCode = 500;
    }
};
/************************************ */
 exports.handleUploadImage = (req, res) => {
    //const { mobile, password } = req.data;
   //const {  filename } = req.file.name;
 //  const {  test } = req.test;
    //for (var key of formD.entries()) {
        //console.log(key[0] + ", " + key[1]);
       // res.status(200).json(key[0] + ", " + key[1]);
      //}  
      //console.log(...req.body);
   //   res.setHeader('content-type', 'application/json');
//res.send(JSON.stringify({req}));
     console.log(req.body);
     //console.log(req.body);
     //console.log(req.file);
 //res.status(200).json(req.file); 
 //const { name,wfile,filename } = req.body;
 //CircularJSON.stringify(obj);
 // res.status(200).send('***************');
  
 // res.status(200).json({ filename: filename});
  /*  for (var key of  req.body.entries()) {
   // console.log(key[0] + ", " + key[1]);
    res.status(200).send( key[0] + ", " + key[1]);
  }  */
 //res.status(200).json( req.body.filename);
 
   const upload = multer({
        limits: { fileSize: 4000000 },
        fileFilter: fileFilter,
    }).single("file");

    upload(req, res, async (err) => {
        if (err) {
            /* if (err.code === "LIMIT_FILE_SIZE") {
                return res
                    .status(201)
                    .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
            } */
            res.status(201).send(err);
        } else {
            if (req.body.filename) {
                 /*const fileName = `${shortId.generate()}_${req.filename
                    }`; */
                await sharp(req.body.file.preview)
                    .jpeg({
                        quality: 60,
                    })
                    .toFile(`./public/uploads/${req.body.filename}`)
                    .catch((err) => console.log(err));
                    res.status(200).send('*****'); 
                /* res.status(200).send(
                    `http://localhost:3000/uploads/${fileName}`
                );   */
            } else {
                res.send("جهت آپلود باید عکسی انتخاب کنید");
            }
        }
    });   
};
 /******************************* */
exports.handleGetImages = async (req, res) => {
    res.status(200).send('*****');
    const page = +req.query.page || 1;
    const postPerPage = 10;

    try {
        const numberOfPosts = await User.find({
            user: req.user._id,
        }).countDocuments();
        const allusers = await User.find({})
            .skip((page - 1) * postPerPage)
            .limit(postPerPage);

        res.render("private/allusersgroups", {
            pageTitle: "بخش مدیریت | کاربران",
            path: "/usersgroup/allusersgroup",
            layout: "./layouts/usersgroupLayout",

            allusers,

            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        });
    } catch (err) {
        console.log(err);
        // get500(req, res);
    }
};
