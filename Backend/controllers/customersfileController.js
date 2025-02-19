//const Yup = require("yup");
const Customersfile = require("../models/CustomersFile");
//const { formatDate } = require("../utils/jalali");
//const { truncate } = require("../utils/helpers");
//const { sendEmail } = require("../utils/mailer");

exports.handleRegisterCustomersfile = async (req, res, next) => {

    try {
        /*const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation is failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }*/

        const { category, city, range, title, meterage, images, price, rooms, yearconstruction, floor, elevator, parking, warehouse, address, desc, user, customer } = req.body;
        ///   const userCount = await Customersfile.findOne({ fullname });

        let customersfile;
        //let messagetxt = "";
        /* if (userCount) {
 
             messagetxt = "Exit Customer!";
             res.status(202).json({ message: messagetxt });
 
         } else {*/
        customersfile = new Customersfile({

            category,
            city,
            range,
            title,
            meterage,
            images,
            price,
            rooms,
            yearconstruction,
            floor,
            elevator,
            parking,
            warehouse,
            address,
            desc,
            user,
            customer,
            /* user: req.user.id,
             customer: customer,
             image: fileName,*/

        });
        await customersfile.save();
        res.status(201).json({ message: "Create File Melk" });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/******************************************* */
exports.getAllFiles = async (req, res, next) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {
        const total = await Customersfile.find().countDocuments();
        const files = await Customersfile.find();
        // .skip((currentPage - 1) * perPage)
        // .limit(perPage);

        res.status(200).json({ files, total });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/****************************** */
/*exports.handleRegisterCustomersfile = async (req, res) => {
    const errorArr = [];

    //  const thumbnail = req.files ? req.files.thumbnail : {};
    const fileName = `${shortId.generate()}_${thumbnail.name}`;
    const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

    try {
        req.body = { ...req.body, thumbnail };

        await Blog.postValidation(req.body);

        await sharp(thumbnail.data)
            .jpeg({ quality: 60 })
            .toFile(uploadPath)
            .catch((err) => console.log(err));

        await Blog.create({
            ...req.body,
            user: req.user.id,
            thumbnail: fileName,
        });
        res.status(202).json({ message: "Create File Melk" });
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });

    }
};*/

/***************************** */
