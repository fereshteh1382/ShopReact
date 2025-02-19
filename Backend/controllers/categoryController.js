//const Yup = require("yup");
const Category = require("../models/Category");
//const { formatDate } = require("../utils/jalali");
//const { truncate } = require("../utils/helpers");
//const { sendEmail } = require("../utils/mailer");
const { get500 } = require("./errorController");


exports.getAllcategory = async (req, res) => {
    const page = +req.query.page || 1;
    const postPerPage = 10;

    try {
        const numberOfPosts = await Category.find({
            user: req.user._id,
        }).countDocuments();
        const allcategory = await Category.find({})
            .skip((page - 1) * postPerPage)
            .limit(postPerPage);

        res.render("private/allcategory", {
            pageTitle: "بخش مدیریت | کاربران",
            path: "/category/addcategory",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            allcategory,

            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: postPerPage * page < numberOfPosts,
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfPosts / postPerPage),
        });
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
};

exports.getAddcategory = (req, res) => {
    res.render("private/addcategory", {
        pageTitle: "بخش مدیریت | ایجاد مجموعه جدید",
        path: "/category/addcategory",
        layout: "./layouts/dashLayout",
        fullname: req.user.fullname,
    });
};

exports.createCategory = async (req, res) => {
    const errors = [];

    try {
        await Category.categoryValidation(req.body);
        const { title, body, parent, thumbnail } = req.body;

        /* const user = await Category.findOne({ email });
        if (user) {
              errors.push({ message: "کاربری با این ایمیل موجود است" });
            return res.render("private/addcategory", {
                pageTitle: "بخش مدیریت | ایجاد مجموعه جدید",
                path: "/category/addcategory",
                layout: "./layouts/dashLayout",
                errors,
            });
        }*/

        await Category.create({ title, body, parent, thumbnail });
        res.redirect("/category/allcategory");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("private/addcategory", {
            pageTitle: "بخش مدیریت | ایجاد مجموعه جدید",
            path: "/category/addcategory",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            errors,
        });


    }
};
exports.getAllcategoryParent = async (req, res) => {
    const allcategoryparent = useState([]);
    try {

        allcategoryparent = await Category.find({});
        console.log(allcategoryparent);
        /*  res.render("private/addcategory", {
              pageTitle: "بخش مدیریت | کاربران",
              path: "/category/addcategory",
              layout: "./layouts/dashLayout",
              fullname: req.user.fullname,
              allcategoryparent,
  
  
          });*/
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
};
exports.getEditUsergroup = async (req, res) => {
    const usergroup = await Usersgroup.findOne({
        _id: req.params.id,
    });

    if (!usergroup) {
        return res.redirect("errors/404");
    }

   /* if (post.user.toString() != req.user._id) {
        return res.redirect("/dashboard/allposts");
    }*/ else {
        res.render("private/editUsersgroup", {
            pageTitle: "بخش مدیریت | ویرایش پست",
            path: "/usersgroup/edit-usersgroup",
            layout: "./layouts/usersgroupLayout",
            // fullname: req.usergroup.fullname,
            usergroup,
        });
    }
};

exports.editUsergroup = async (req, res) => {
    const errorArr = [];
    // const errors = [];


    const usergroup = await Usersgroup.findOne({ _id: req.params.id });
    try {
        if (!usergroup) {
            return res.redirect("errors/404");
        }

      /*  if (usergroup.user.toString() != req.user._id) {
            return res.redirect("/dashboard/allposts");
        }*/ else {

            //   await Usersgroup.userValidation(req.body);
            const { fullname, username, level, email, password } = req.body;
            /*
                        const user = await Usersgroup.findOne({ email });
                        if (user) {
                            errors.push({ message: "کاربری با این ایمیل موجود است" });
                            return res.render("private/editUsersgroup", {
                                pageTitle: "بخش مدیریت | ویرایش کاربر ",
                                path: "/usersgroup/edit-usersgroup",
                                layout: "./layouts/usersgroupLayout",
                                errors,
                                usergroup
                            });
                        }*/


            usergroup.fullname = fullname;
            usergroup.username = username;
            usergroup.level = level;
            usergroup.email = email;
            usergroup.password = password;

            await usergroup.save();
            return res.redirect("/usersgroup/allusersgroup");
        }
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("private/editUsersgroup", {
            pageTitle: "بخش مدیریت | ویرایش کاربر",
            path: "/usersgroup/edit-usersgroup",
            layout: "./layouts/usersgroupLayout",
            // fullname: req.usergroup.fullname,
            usergroup,
        });
    }
};

exports.deleteUsergroup = async (req, res) => {
    try {
        const result = await Usersgroup.findByIdAndRemove(req.params.id);
        console.log(result);
        res.redirect("/usersgroup/allusersgroup");
    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};
/*
exports.createUsergroup = async (req, res) => {
    const errorArr = [];

    const thumbnail = req.files ? req.files.thumbnail : {};
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
        res.redirect("/dashboard/allposts");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("private/addPost", {
            pageTitle: "بخش مدیریت | ساخت پست جدید",
            path: "/dashboard/add-post",
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            errors: errorArr,
        });
    }
};
exports.uploadImage = (req, res) => {
    const upload = multer({
        limits: { fileSize: 4000000 },
        fileFilter: fileFilter,
    }).single("image");

    upload(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res
                    .status(400)
                    .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
            }
            res.status(400).send(err);
        } else {
            if (req.file) {
                const fileName = `${shortId.generate()}_${req.file.originalname
                    }`;
                await sharp(req.file.buffer)
                    .jpeg({
                        quality: 60,
                    })
                    .toFile(`./public/uploads/${fileName}`)
                    .catch((err) => console.log(err));
                res.status(200).send(
                    `http://localhost:3000/uploads/${fileName}`
                );
            } else {
                res.send("جهت آپلود باید عکسی انتخاب کنید");
            }
        }
    });
};
*/
