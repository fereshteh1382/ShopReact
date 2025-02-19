const passport = require("passport");
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { sendEmail } = require("../utils/mailer");

exports.login = (req, res) => {
    res.render("login", {
        pageTitle: "ورود به بخش مدیریت",
        path: "/login",
        message: req.flash("success_msg"),
        error: req.flash("error"),
    });
};


exports.rememberMe = (req, res) => {
    if (req.body.remember) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 1 day 24
    } else {
        req.session.cookie.expire = null;
    }

    res.redirect("/dashboard");
};

exports.logout = (req, res) => {
    req.session = null;
    req.logout();
    // req.flash("success_msg", "خروج موفقیت آمیز بود");
    res.redirect("/admin/login");
};

exports.register = (req, res) => {
    res.render("register", {
        pageTitle: "ثبت نام کاربر جدید",
        path: "/register",
    });
};
exports.handleRegister = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation is failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { username, fullname, password } = req.body;
        //  const hashedPw = await bcrypt.hash(password, 12);
        const userCount = await User.findOne({ username });
        

        let user; let messagetxt = "";
        // if (userCount !== 0) {
        if (userCount) {
            
            messagetxt = "Exit User With This Username!";
            res.status(201).json({ message: messagetxt });

        } else {
            user = new User({

                fullname,
                username,
                password: password,
                status: "raw"
                // isAdmin: false
            });
         
            let verifycode = (Math.random() + 1).toString(36).substring(7);
            // console.log()
            user.verifycode = verifycode;
            await user.save();

          /*   var Kavenegar = require('kavenegar');
            var api = Kavenegar.KavenegarApi({
                apikey: '7A63756B4330304473632B7471614A78376D7A4B66347264434E3066492B6C5A74654C3161534C503636593D'
            });
            api.VerifyLookup({
                receptor: username,
                token: username,
                token2: verifycode,
                template: "verify"
            }, function (response, status) {
                console.log(response);
                console.log(stat us);
            });*/
            /** */


            /** */
            /* var Kavenegar = require('kavenegar');
             var api = Kavenegar.KavenegarApi({
                 apikey: '7A63756B4330304473632B7471614A78376D7A4B66347264434E3066492B6C5A74654C3161534C503636593D'
             });
             api.VerifyLookup({
                 receptor: mobile,
                 token: mobile,
                 // token20: "ثبت نام شما با موفقیت انجام شد پس از تایید ادمین میتوانید لاگین نمایید.",
                 template: "amlak"
             }, function (response, status) {
                 console.log(response);
                 console.log(status);
             });*/
            /** */

            /***** */
            messagetxt = "User created.";
            res.status(200).json({ message: messagetxt });
        }

        // sendEmail(
        //     user.email,
        //     user.fullname,
        //     'Signup was seccessfull.',
        //     'We glad to have you on board.'
        // )
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/*************************** */
exports.getremainsms = async (req, res) => {

    try {
        const user = await User.findOne({ user: req.params.userid });
        if (!user) {

            error.statusCode = 401;
            throw error;
        }


        res.status(200).json({ smscount: user.smscount });

        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */

exports.forgetPasswrod = async (req, res) => {
    res.render("forgetPass", {
        pageTitle: "فراموشی رمز عبور",
        path: "/login",
        message: req.flash("success_msg"),
        error: req.flash("error"),
    });
};

exports.handleForgetPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        req.flash("error", "کاربری با ایمیل در پایگاه داده ثبت نیست");

        return res.render("forgetPass", {
            pageTitle: "فراموشی رمز عبور",
            path: "/login",
            message: req.flash("success_msg"),
            error: req.flash("error"),
        });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    const resetLink = `http://localhost:3000/admin/reset-password/${token}`;

    sendEmail(
        user.email,
        user.fullname,
        "فراموشی رمز عبور",
        `
        جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
        <a href="${resetLink}">لینک تغییر رمز عبور</a>
    `
    );

    req.flash("success_msg", "ایمیل حاوی لینک با موفقیت ارسال شد");

    res.render("forgetPass", {
        pageTitle: "فراموشی رمز عبور",
        path: "/login",
        message: req.flash("success_msg"),
        error: req.flash("error"),
    });
};

exports.resetPassword = async (req, res) => {
    const token = req.params.token;

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
    } catch (err) {
        console.log(err);
        if (!decodedToken) {
            return res.redirect("/404");
        }
    }

    res.render("resetPass", {
        pageTitle: "تغییر پسورد",
        path: "/login",
        message: req.flash("success_msg"),
        error: req.flash("error"),
        userId: decodedToken.userId,
    });
};
/*********************Handle************** */
exports.handleLogin = async (req, res, next) => {
  
     //res.status(200).send('*****');
     console.log(req.body);
   const { username, password } = req.body;
    
  // res.status(200).json({ username: username});
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Error.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const user = await User.findOne({ username });
        if (!user) {
            const error = new Error(
                "A user with this username Not found!"
            );
            error.statusCode = 201;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error("Incorrect Username Or Password !");
            error.statusCode = 201;
            throw error;
        }
       
        const token = await jwt.sign(
            {
                user: {
                    userId: user._id.toString(),
                    username: user.username,
                    fullname: user.fullname,
                    status: user.status
                   
                }
            },
            "secret",
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({ token, userId: user._id.toString() });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return res.status(err.statusCode).send(err.message);
    }   
};
/*********************************** */
exports.handleVerifyCode = async (req, res, next) => {

    try {
        const user = await User.findOne({ mobile: req.params.mobile });
        if (!user) {

            error.statusCode = 401;
            throw error;
        }
        verifyuser = req.params.verifycode.toString();
        if (user.verifycode === verifyuser) {
            user.status = "noactive";
            await user.save();
            res.status(200).json({ user: user });
        } else {
            res.status(201).json({ message: "verifycode is incorrect" });
        }


    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/*********************Handle************** */
exports.handleTokenLogin = async (req, res, next) => {


    try {

        const user = await User.findOne({ mobile: req.params.mobile });
        if (!user) {
            const error = new Error(
                "A user with this mobile could not be found"
            );
            error.statusCode = 401;
            throw error;
        }

        //if (user.status == "admin") {

        const token = jwt.sign(
            {
                user: {
                    userId: user._id.toString(),
                    mobile: user.mobile,
                    fullname: user.fullname,
                    status: user.status
                    // isAdmin: user.isAdmin
                }
            },
            "secret",
            {
                expiresIn: "1h"
            }
        );



        //  } else { token = 'null'; }
        res.status(200).json({ token, user: user });
        //res.status(200).json({ message: user.status });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return res.status(err.statusCode).send(err.message);
    }
};
/************************************** */
/************************************** */
exports.AdminhandleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        //  const errors = validationResult(req);
        /* (!errors.isEmpty()) {
            const error = new Error("Validation Error.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }*/
        const user = await User.findOne({ email });
        if (!user) {
            req.flash("error", "This User Not Exist!");
            res.redirect("/admin/login");
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            req.flash("error", "User Or Passs Is Wrong");
            res.redirect("/admin/login");
        }
        if (user.status !== "admin") {
            req.flash("error", "This User not Admin");
            res.redirect("/admin/login");
        }
        const token = await jwt.sign(
            {
                user: {
                    userId: user._id.toString(),
                    email: user.email,
                    fullname: user.fullname,
                    isAdmin: user.isAdmin
                }
            },
            "secret",
            {
                expiresIn: "1h"
            }
        );
        req.flash("success_msg", "ورود موفقیت آمیز بود.");
        //res.redirect("/users/allusers");
    } catch (err) {
        // console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });

        /*return res.render("register", {
            pageTitle: "ثبت نام کاربر",
            path: "/admin/dashboard",
            errors,
        });*/
    }

};
/************************************** */
exports.handleResetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    console.log(password, confirmPassword);

    if (password !== confirmPassword) {
        req.flash("error", "کلمه های عبور یاکسان نیستند");

        return res.render("resetPass", {
            pageTitle: "تغییر پسورد",
            path: "/login",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            userId: req.params.id,
        });
    }

    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
        return res.redirect("/404");
    }

    user.password = password;
    await user.save();

    req.flash("success_msg", "پسورد شما با موفقیت بروزرسانی شد");
    res.redirect("/admin/login");
};

/************************************ */
exports.getAllUsersFront = async (req, res) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {

        const allusers = await User.find({})
            .sort({
                createdAt: "desc",
            });

        res.status(200).json({ allusers });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */
/******************************* */
exports.getAllusers = async (req, res) => {
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
exports.activeUser = async (req, res) => {
    try {
        //const result = await User.findById(req.params.id);
        const result = await User.findByIdAndUpdate(req.params.id, { status: 'active' });

        // console.log(result);
        //res.redirect("/users/allusers");
        res.status(200).json({ message: "ِActive Success." });
    } catch (err) {
        console.log(err);
        err.statusCode = 500;
    }
};
exports.disactiveUser = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, { status: 'noactive' });

        // console.log(result);
        // res.redirect("/users/allusers");
        res.status(200).json({ message: "ِDisActive Success." });
    } catch (err) {
        console.log(err);
        err.statusCode = 500;
    }
};
/************************ */
exports.addSmsUserForm = async (req, res) => {

    try {

        // const allusers = await User.find({})
        const result = await User.findById(req.params.id);
        const fullname = result.fullname;
        const userid = req.params.id;

        res.render("private/addsms", {
            pageTitle: "بخش مدیریت | افزودن شارژ",
            path: "/users/allusersgroup",
            layout: "./layouts/usersgroupLayout",
            fullname,
            userid

        });
    } catch (err) {
        console.log(err);
        // get500(req, res);
    }


};
/************************************** */
exports.addSmsUserPost = async (req, res) => {
    //let counts = req.body.smscount;
    let counts = req.params.smscount;
    let user = await User.findOne({ _id: req.params.id });
    try {
        if (!user) {
            //return res.redirect("/404");
            error.statusCode = 401;
            throw error;
        } else {
            //console.log(user.smscount);
            user.smscount = Number(user.smscount) + Number(counts);
            await user.save();
        }

        res.status(200).json({ message: "Saved" });
        //res.redirect("/users/allusers");
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************** */
/*************************** */
exports.getSingleUser = async (req, res) => {

    try {
        const user = await User.findOne({ user: req.params.id });
        if (!user) {

            error.statusCode = 401;
            throw error;
        }


        res.status(200).json({ user: user });

        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */
/*********************** */
exports.AdminhandleLogin1 = async (req, res, next) => {
    /* if (!req.body["g-recaptcha-response"]) {
         req.flash("error", "اعتبار سنجی captcha الزامی می باشد");
         return res.redirect("/admin/login");
     }
 
     const secretKey = process.env.CAPTCHA_SECRET;
     const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}
       &remoteip=${req.connection.remoteAddress}`;
 
     const response = await fetch(verifyUrl, {
         method: "POST",
         headers: {
             Accept: "application/json",
             "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
         },
     });
 
     const json = await response.json();
 
     if (json.success) {
         passport.authenticate("local", {
             failureRedirect: "/admin/login",
             failureFlash: true,
         })(req, res, next);
     } else {
         req.flash("error", "مشکلی در اعتبارسنجی captcha هست");
         res.redirect("/admin/login");
     }*/
    passport.authenticate("local", {
        failureRedirect: "/admin/login",
        failureFlash: true,
    })(req, res, next);

};

 /*exports.activeUser = (event, personId) => {
    return async (dispatch, getState) => {
        const allPersons = [...getState().persons];

        const personIndex = allPersons.findIndex(p => p.id === personId);
        const person = allPersons[personIndex];
        person.fullname = event.target.value;

        const persons = [...allPersons];

        persons[personIndex] = person;
        await dispatch({ type: "UPDATE_PERSON", payload: persons });
    };
 };
 */

 