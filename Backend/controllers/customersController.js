//const Yup = require("yup");
const Customers = require("../models/Customers");
//const { formatDate } = require("../utils/jalali");
//const { truncate } = require("../utils/helpers");
//const { sendEmail } = require("../utils/mailer");
const User = require("../models/User");

exports.handleRegisterCustomers = async (req, res, next) => {
    // console.log(req);
    try {
        /* const errors = validationResult(req);
         if (!errors.isEmpty()) {
             const error = new Error("Validation is failed.");
             error.statusCode = 422;
             error.data = errors.array();
             throw error;
         }*/

        const { fullname, tel, address, desc, userId } = req.body;
        // const user = req.user._id;

        // const userCount = await Customers.findOne({ fullname });
        let customers; let messagetxt = "";
        /*if (userCount) {
        
                    messagetxt = "Exit Customer!";
                    res.status(202).json({ message: messagetxt });
        
                } else {*/
        customers = new Customers({
            fullname,
            tel,
            address,
            desc,
            user: userId
        });
        await customers.save();
        /* await customers.create({
             ...req.body,
             user: req.user.id,
         });*/
        // console.log(res.insertId);
        //messagetxt = "User created.";records[0]._id
        // messagetxt = cust.insertedId;
        messagetxt = res.insertedId;
        res.status(201).json({ message: messagetxt });
        // }


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************** */
exports.editCustomer = async (req, res, next) => {

    try {
        /* const errors = validationResult(req);
         if (!errors.isEmpty()) {
             const error = new Error("Validation is failed.");
             error.statusCode = 422;
             error.data = errors.array();
             throw error;
         }*/
        const customer = await Customers.findOne({ _id: req.params.id });

        const { fullname, tel, address, desc, userId } = req.body;
        // const userCount = await Customers.findOne({ fullname });
        // let customers; 
        /*if (customer.user.toString() != userId) {
            res.status(403).json({ message: "عدم دسترسی مجاز" });

        } else {*/

        customer.fullname = fullname;
        customer.tel = tel;
        customer.address = address;
        customer.desc = desc;

        await customer.save();
        res.status(200).json({ message: "اطلاعات کاربر با موفقیت ویرایش گردید." });
        //  }


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */

/************************************ */
exports.getAllCustomers = async (req, res) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {

        const numberOfCustomers = await Customers.find({
            user: req.params.userid,
        }).countDocuments();

        const allcustomers = await Customers.find({ user: req.params.userid })
            .sort({
                createdAt: "desc",
            });
        // const user = req.params.userid;// req.user._id; 

        //const allcustomers = await Customers.find({ user: "645d5e3d53e8461554ae6be4" });
        // .skip((currentPage - 1) * perPage)
        // .limit(perPage);
        res.status(200).json({ allcustomers, numberOfCustomers });
        //console.log(allcustomers);

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/************************* */
exports.deleteCustomer = async (req, res) => {
    try {
        const result = await Customers.findByIdAndRemove(req.params.id);
        console.log(result);
        //res.redirect("/dashboard/allposts");
        res.status(200).json({ message: "Deleted Customer ." });
    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};
/******************************* */
exports.smsCustomer = async (req, res) => {
    /*var Kavenegar = require('kavenegar');
    var api = Kavenegar.KavenegarApi({
        apikey: '7A63756B4330304473632B7471614A78376D7A4B66347264434E3066492B6C5A74654C3161534C503636593D'
    });*/
    try {

        user = req.params.userid;
        num = req.params.customernumbers;
        // msg = req.params.message;// console.log(msg);
        msg = req.params.message.toString();

        //msg = " به پنل مدیریت املاک خوش آمدی";
        const userfind = await User.findOne({ _id: user });
        /*if (userfind.smscount > 0) {
            
            api.VerifyLookup({
                receptor: num,
                token: num,
                //token20: "به پنل مدیریت املاک خوش آمدید.",
                // token20: "welcome To Panel",
                token20: msg,
                template: "rezerv"
            }, function (response, status) {
                console.log(response);
                console.log(status);
            });
            
            userfind.smscount = userfind.smscount - 1;
            await userfind.save();
            res.status(201).json({ message: "Send Sms To Customer .", msg });


        } else {
            res.status(202).json({ message: "You Don't Have Account For Send Sms." });
        }*/

    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }

};
/******************************* */
exports.smstoAllCustomers = async (req, res) => {
    /*var Kavenegar = require('kavenegar');
    var api = Kavenegar.KavenegarApi({
        apikey: '7A63756B4330304473632B7471614A78376D7A4B66347264434E3066492B6C5A74654C3161534C503636593D'
    });*/
    try {

        /*  user = req.params.userid;
          msg = req.params.message;
          let userfind = await User.findOne({ _id: user });
          let smscount = userfind.smscount;
          let allcustomers = await Customers.find({ user: user });
          let count = 0;
          for (let customer of allcustomers) {
              if (smscount > 0) {
                  
                  api.Send({
                      message: msg, //"وب سرویس تخصصی کاوه نگار",
                      sender: "10008663",
                      receptor: customer.tel //"09156195942"
  
                  },
                      function (response, status) {
                          console.log(response);
                          console.log(status);
                      });
  
                  
                  smscount = smscount - 1;
                  count = count + 1;
              } else {
                  res.status(202).json({ message: "You Don't Have Account For Send Sms." });
              }
          }//for
          res.status(201).json({ message: "Send Sms To Customer .", count: count });
  
          userfind.smscount = smscount;
          await userfind.save();
        */


    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};

/**************************************/
exports.getSingleCustomer = async (req, res) => {
    try {
        const singlecustomer = await Customers.findOne({ _id: req.params.id });

        /* const post = await Blog.findOne({ _id: req.params.id }).populate(
             "user"
         );*/

        if (singlecustomer) {
            res.status(200).json({ singlecustomer });
        } else {
            res.status(201).json({ message: "Not Exist Customer with this id ." });
        }


    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }

    }
};
/******************************** */
/*exports.findAll = function (req, res) {
    var country = req.params.country;
    db.collection('wines', function (err, collection) {
        collection.find({ 'country': new RegExp('/' + country + '/i') }).toArray(function (err, items) {
            res.jsonp(items);
        });
    });
};*/
/**************************** */
exports.getSearchCustomer = async (req, res) => {
    try {
        const name = req.params.name;
        const userid = req.params.userid;

        const searchcustomer = await Customers.find({
            $and: [
                { fullname: { $regex: '.*' + name + '.*', $options: 'i' } },
                { user: userid }
            ]
        });
        res.status(200).json({ name, searchcustomer });

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }

    }
};


