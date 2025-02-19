//const Yup = require("yup");
//import { storage } from 'redux-persist/lib/storage';
const Realty = require("../models/Realty");
//const { formatDate } = require("../utils/jalali");
//const { truncate } = require("../utils/helpers");
//const { sendEmail } = require("../utils/mailer");
const User = require("../models/User");
const multer = require("multer");
const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-path");
const { storage, fileFilter } = require("../utils/multer");

exports.handleAddRealty = async (req, res, next) => {

    try {
        /** */
        /*  const thumbnail1 = req.files ? req.files.thumbnail1 : {};
          const thumbnail2 = req.files ? req.files.thumbnail2 : {};
          const thumbnail3 = req.files ? req.files.thumbnail3 : {};
         
          const fileName1 = `${shortId.generate()}_${thumbnail1.name}`;
          const uploadPath1 = `${appRoot}/public/uploads/thumbnails/${fileName1}`;
          const fileName2 = `${shortId.generate()}_${thumbnail2.name}`;
          const uploadPath2 = `${appRoot}/public/uploads/thumbnails/${fileName2}`;
          const fileName3 = `${shortId.generate()}_${thumbnail3.name}`;
          const uploadPath3 = `${appRoot}/public/uploads/thumbnails/${fileName3}`;
           await sharp(thumbnail1.data)
               .jpeg({ quality: 60 })
               .toFile(uploadPath1)
               .catch((err) => console.log(err));
           await sharp(thumbnail2.data)
               .jpeg({ quality: 60 })
               .toFile(uploadPath2)
               .catch((err) => console.log(err));
           await sharp(thumbnail3.data)
               .jpeg({ quality: 60 })
               .toFile(uploadPath3)
               .catch((err) => console.log(err));*/
        /*** */
        // req.body = { ...req.body, thumbnail1, thumbnail2, thumbnail3 };
        //console.log(req.body);
        const { category, city, range, title, meterage,
            images, price, rooms, yearconstruction, floor,
            elevator, parking, warehouse, address, desc, user, customer, status } = req.body;
        let realty;
        let messagetxt = "";

        /* await Realty.create({
             ...req.body,
 
             thumbnail1: fileName1,
             thumbnail2: fileName2,
             thumbnail3: fileName3,
         });*/
        realty = new Realty({
            category, city, range, title, meterage, images,
            price, rooms, yearconstruction, floor, elevator,
            parking, warehouse, address, desc, user, customer, status,

            /*thumbnail1: fileName1,
            thumbnail2: fileName2,
            thumbnail3: fileName3,*/
        });
        await realty.save();

        messagetxt = "realty Added.";
        res.status(201).json({ message: messagetxt });



    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************** */
exports.editRezerv = async (req, res, next) => {

    try {
        /* const errors = validationResult(req);
         if (!errors.isEmpty()) {
             const error = new Error("Validation is failed.");
             error.statusCode = 422;
             error.data = errors.array();
             throw error;
         }*/
        const rezerv = await Rezerv.findOne({ _id: req.params.id });
        if (Rezerv) {

            const { rezervdate, rezervtime } = req.body;
            rezerv.rezervdate = rezervdate;
            rezerv.rezervtime = rezervtime;
            await rezerv.save();
            res.status(201).json({ message: "rezerv saved." });
        }


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */
exports.getAllPublicRealty = async (req, res, next) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {
        /* Drinks
         .find({})
         .populate('drinks_name', 'tab.name')
         .exec(function (err, result) { 
            console.log('The Drinks List is', result);
         });*/
        const allrealtys = await Realty.find({ status: "public" })
            .populate('user')

            .sort({
                createdAt: "desc",
            })


        // .skip((currentPage - 1) * perPage)
        // .limit(perPage);
        //console.log(allcustomers);
        res.status(200).json({ allrealtys });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */
exports.getAllUserRealty = async (req, res, next) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {
        const allrealtys = await Realty.find({ user: req.params.userid })
            .sort({
                createdAt: "desc",
            })

        // .skip((currentPage - 1) * perPage)
        // .limit(perPage);
        //console.log(allcustomers);
        res.status(201).json({ allrealtys });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */
exports.deleterezerv = async (req, res) => {
    try {
        const result = await Customers.findByIdAndRemove(req.params.id);
        console.log(result);
        //res.redirect("/dashboard/allposts");
        res.status(201).json({ message: "Deleted Customer ." });
    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};
/********************************* */
exports.getAllrealtyforadmin = async (req, res) => {

    try {

        const allrealtys = await Realty.find({ user: req.params.id })
            .sort({
                createdAt: "desc",
            })

        res.render("private/allrealty", {
            pageTitle: "بخش مدیریت | فایل ها",
            path: "/usersgroup/allusersgroup",
            layout: "./layouts/usersgroupLayout",

            allrealtys,

            /* currentPage: page,
             nextPage: page + 1,
             previousPage: page - 1,
             hasNextPage: postPerPage * page < numberOfPosts,
             hasPreviousPage: page > 1,
             lastPage: Math.ceil(numberOfPosts / postPerPage),*/
        });
    } catch (err) {
        console.log(err);
        // get500(req, res);
    }
};
/************************** */
exports.confirmrealty = async (req, res) => {
    try {
        const result = await Realty.findByIdAndUpdate(req.params.id, { status: 'public' });

        // console.log(result);
        // res.redirect("/users/allusers");
        res.status(200).json({ message: "confirm realty." });

    } catch (err) {
        console.log(err);
        //  res.render("errors/500");
    }
};
/************************** */
exports.noconfirmrealty = async (req, res) => {
    try {
        const result = await Realty.findByIdAndUpdate(req.params.id, { status: 'private' });

        // console.log(result);
        // res.redirect("/users/allusers");
        res.status(200).json({ message: "No confirm realty." });
    } catch (err) {
        console.log(err);
        //res.render("errors/500");
    }
};
/************************** */
exports.editRealty = async (req, res, next) => {

    try {
        /* const errors = validationResult(req);
         if (!errors.isEmpty()) {
             const error = new Error("Validation is failed.");
             error.statusCode = 422;
             error.data = errors.array();
             throw error;
         }*/
        const realty = await Realty.findOne({ _id: req.params.id });

        const { city, range, title, meterage,
            price, rooms, yearconstruction, floor, elevator,
            parking, warehouse, address, desc } = req.body;

        realty.city = city;
        realty.range = range;
        realty.title = title;
        realty.meterage = meterage;
        realty.price = price;
        realty.rooms = rooms;
        realty.yearconstruction = yearconstruction;
        realty.floor = floor;
        realty.elevator = elevator;
        realty.parking = parking;
        realty.warehouse = warehouse;
        realty.address = address;
        realty.desc = desc;

        await realty.save();
        res.status(200).json({ message: "اطلاعات ملک با موفقیت ویرایش گردید." });
        //  }


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */
/*************************** */
exports.getSingleRealty = async (req, res) => {

    try {

        const realty = await Realty.findOne({ _id: req.params.id });
        if (!realty) {

            error.statusCode = 401;
            throw error;
        }


        res.status(200).json({ realty: realty });

        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */

exports.getAddFilet = (req, res) => {
    res.render("private/addPost", {
        pageTitle: "بخش مدیریت | ساخت پست جدید",
        path: "/realty/image-upload",
        layout: "./layouts/dashLayout",
        fullname: "admin",
    });
};
/************************* */
exports.uploadImageRealty00 = async (req, res) => {
    // const errorArr = [];
    //console.log(req.files);
    // console.log(req.files.thumbnail1.name);

    const realtyid = "64b827f4d0019a3ba8eba0e8"; //req.body.realtyid;
    const thumbnail1 = req.file ? req.file.thumbnail1 : {};
    /* const thumbnail2 = req.files ? req.files.thumbnail2 : {};
     const thumbnail3 = req.files ? req.files.thumbnail3 : {};*/
    // console.log(thumbnail1.name);
    const fileName1 = `${shortId.generate()}_${thumbnail1.name}`;
    const uploadPath1 = `${appRoot}/public/uploads/thumbnails/${fileName1}`;
    /* const fileName2 = `${shortId.generate()}_${thumbnail2.name}`;
     const uploadPath2 = `${appRoot}/public/uploads/thumbnails/${fileName2}`;
     const fileName3 = `${shortId.generate()}_${thumbnail3.name}`;
     const uploadPath3 = `${appRoot}/public/uploads/thumbnails/${fileName3}`;
 */


    try {
        /*   req.body = { realtyid, thumbnail1, thumbnail2, thumbnail3 };
   
           // console.log(req.body);
   
           //await Blog.postValidation(req.body);
*/
        await sharp(thumbnail1.data)
            .jpeg({ quality: 60 })
            .toFile(uploadPath1)
            .catch((err) => console.log(err));
        /* await sharp(thumbnail2.data)
             .jpeg({ quality: 60 })
             .toFile(uploadPath2)
             .catch((err) => console.log(err));
         await sharp(thumbnail3.data)
             .jpeg({ quality: 60 })
             .toFile(uploadPath3)
             .catch((err) => console.log(err));
 */

        //const { realtyid, thumbnail1, thumbnail2, thumbnail3 } = req.body;

        const realty = await Realty.findOne({ _id: realtyid });
        //console.log(realty);
        //if (realty) { res.redirect("/dashboard"); }

        realty.thumbnail1 = fileName1;
        // realty.thumbnail2 = fileName2;
        //  realty.thumbnail3 = fileName3;

        await realty.save();

        messagetxt = "Realty Images Added.";
        res.status(200).json({ message: messagetxt });
        //  res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }

    }
};
/**************************** */
exports.uploadImageRealty = (req, res) => {

    //const upload = multer({
    //   limits: { fileSize: 4000000 },
    // dest: "./public/uploads/",
    //     storage: storage,
    //  fileFilter: fileFilter,
    // }).single("thumbnail1");
    // console.log(req.files);

    const randomid = `${shortId.generate()}`;

    var storage = multer.diskStorage({

        destination: function (req, file, callback) {
            callback(null, './public/uploads/');
            // callback(null, 'pub/uploads');
        },
        filename: function (req, file, callback) {
            // var temp_file_arr = file.originalname.split(".");

            //  var temp_file_name = temp_file_arr[0];

            // var temp_file_extension = temp_file_arr[1];
            var filename_ = randomid + `_` + `${file.originalname}`;
            callback(null, filename_);

            //callback(null, Date.now());

        }

    });

    var upload = multer({ storage: storage }).single('thumbnail1');

    // var upload = multer({ storage: storage }).array("thumbnail1", 3);
    //console.log(upload);

    upload(req, res, async (err) => {

        if (err) {
            console.log(err);

            if (err.code === "LIMIT_FILE_SIZE") {
                return res
                    .status(400)
                    .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
            }
            res.status(400).send(err);
        } else {

            if (req.file) {

                fileName = randomid + `_` + `${req.file.originalname}`;
                const rid = req.body.realtyid;
                const fid = req.body.fid; console.log(fid);

                const realty = await Realty.findOne({ _id: rid });
                switch (fid) {
                    case "1":
                        realty.thumbnail1 = fileName;
                        break;
                    case "2":
                        realty.thumbnail2 = fileName;
                        break;
                    case "3":
                        realty.thumbnail3 = fileName;
                        break;
                }
                //  realty.thumbnail1 = fileName;
                //realty.thumbnail2 = fileName2;
                //  realty.thumbnail3 = fileName3;

                await realty.save();

                /** */
                /*await sharp(req.file.buffer)
                    .jpeg({
                        quality: 60,
                    })
                    .toFile(`./public/uploads/${fileName}`)
                    .catch((err) => console.log(err));
*/

                //res.json("success");
                // res.send(`${fid}`);

                res.status(200).send(
                    `http://localhost:3000/uploads/${fileName}`
                );
            } else {
                res.json("جهت آپلود باید عکسی انتخاب کنید");
            }
        }
    });


};
/************************ */
exports.uploadImageRealty0 = (req, res, next) => {

    var storage = multer.diskStorage({

        destination: function (req, file, callback) {
            callback(null, './public/uploads/');
        },
        filename: function (req, file, callback) {
            var temp_file_arr = file.originalname.split(".");

            var temp_file_name = temp_file_arr[0];

            var temp_file_extension = temp_file_arr[1];

            callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
        }

    });

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (error) {
        console.log(req.files);

        if (error) {
            // return response.end('Error Uploading File');
            res.send("Error Uploading File");
            // res.json({ 'message': 'File uploaded No successfully' });

        }
        else {
            // return response.end('File is uploaded successfully');
            //  res.send("uploaded successfully");
            // res.json({ 'message': file.originalname });
            console.dir(req.headers['content-type']);
            //console.log(req.body.thumbnail1);
        }

    });

};

/********************************/
