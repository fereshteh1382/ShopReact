const { Router } = require("express");

const customersfileController = require("../controllers/customersfileController");

const router = new Router();


router.post("/add-customersfile", customersfileController.handleRegisterCustomersfile);
router.post("/image-upload", customersfileController.uploadImage);

module.exports = router;
