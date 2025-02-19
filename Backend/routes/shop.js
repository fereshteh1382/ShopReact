const { Router } = require("express");

const shopController = require("../controllers/shopController");

const { authenticated } = require("../middlewares/auth");

const router = new Router();

//router.post("/handleLogin", userController.handleLogin);
//router.post("/handleRegister", userController.handleRegister);
router.post("/handleUploadImage", shopController.handleUploadImage);
router.post("/handleGetImages", shopController.handleGetImages);

router.post("/handleSaveCategory", shopController.handleSaveCategory);
router.post("/handleGetAllCategory", shopController.handleGetAllCategory);
router.post("/handleGetAllCategoriez", shopController.handleGetAllCategoriez);
router.post("/handleSaveBrands", shopController.handleSaveBrands);
router.post("/handleGetAllBrands", shopController.handleGetAllBrands);
router.post("/handleSaveScoring", shopController.handleSaveScoring);
router.post("/handleGetAllScoring", shopController.handleGetAllScoring);
router.post("/handleSaveSpecifications", shopController.handleSaveSpecifications);
router.post("/handleGetAllSpecifications", shopController.handleGetAllSpecifications);
router.post("/handleSaveSubSpecifications", shopController.handleSaveSubSpecifications);
router.post("/handleGetAllSubSpecifications", shopController.handleGetAllSubSpecifications);


module.exports = router;
