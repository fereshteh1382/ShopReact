const { Router } = require("express");

const productController = require("../controllers/productController");
const { authenticated } = require("../middlewares/auth");

const router = new Router();


router.post("/handleSaveSeller", productController.handleSaveSeller);
router.post("/handleGetAllSeller", productController.handleGetAllSeller);
router.post("/handleUpdateSeller", productController.handleUpdateSeller);
router.post("/handleSaveWarranty", productController.handleSaveWarranty);
router.post("/handleGetAllWarrenty", productController.handleGetAllWarrenty);

router.post("/handleGetAllProductDepend", productController.handleGetAllProductDepend);
router.post("/handleSaveProduct", productController.handleSaveProduct);
router.post("/handleGetAllProducts", productController.handleGetAllProducts);

module.exports = router;
