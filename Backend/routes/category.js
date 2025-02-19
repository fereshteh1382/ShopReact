const { Router } = require("express");
const { authenticated } = require("../middlewares/auth");

//const adminController = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");
//const userController = require("../controllers/userController");

const router = new Router();

//  @desc   Dashboard
//  @route  GET /dashboard
router.get("/", categoryController.getAllcategory);

router.get("/allcategory", categoryController.getAllcategory);
//  @desc   Dashboard Add Post
//  @route  GET /dashboard/add-post
router.get("/addcategory", categoryController.getAddcategory);

//  @desc   Dashboard Edit Post
//  @route  GET /dashboard/edit-post/:id
//router.get("/edit-usersgroup/:id", authenticated, adminController.getEditUsergroup);
//router.get("/edit-usersgroup/:id", categoryController.getEditUsergroup);
//  @desc   Dashboard Delete Post
//  @route  GET /dashboard/delete-post/:id
//router.get("/delete-usersgroup/:id", categoryController.deleteUsergroup);

//  @desc   Dashboard Handle Post Creation
//  @route  POST /dashboard/add-post
router.post("/addcategory", categoryController.createCategory);

//  @desc   Dashboard Handle Post Edit
//  @route  POST /dashboard/edit-post/:id
//router.post("/edit-usersgroup/:id", categoryController.editUsergroup);

//  @desc   Dashboard Handle Image Upload
//  @route  POST /dashboard/image-upload
//router.post("/image-upload", authenticated, adminController.uploadImage);

module.exports = router;
