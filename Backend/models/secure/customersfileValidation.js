const Yup = require("yup");

exports.schema = Yup.object().shape({
    fullname: Yup.string()
        .required("نام و نام خانوادگی الزامی می باشد")
        .min(4, "نام و نام خانوادگی نباید کمتر از 4 کاراکتر باشد")
        .max(255, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
    adress: Yup.string().required("آدرس الزامی میباشد."),
    tel: Yup.string().required("تلفن الزامی میباشد."),
});
