const { Router } = require("express");
const realtyController = require("../controllers/realtyController");

const router = new Router();

router.post("/add-realty", realtyController.handleAddRealty);
router.get("/all-publicrealty", realtyController.getAllPublicRealty);
router.get("/all-userrealty/:userid", realtyController.getAllUserRealty);
router.get("/all-userrealtyforadmin/:id", realtyController.getAllrealtyforadmin);
router.get("/confirmrealty/:id", realtyController.confirmrealty);
router.get("/noconfirmrealty/:id", realtyController.noconfirmrealty);
router.post("/edit-realty/:id", realtyController.editRealty);

/*router.get("/delete-realty/:id", realtyController.deleteRealty);*/
router.post("/single-realty/:id", realtyController.getSingleRealty);
router.get("/image-add/", realtyController.getAddFilet);
router.post("/image-upload", realtyController.uploadImageRealty);

module.exports = router;
