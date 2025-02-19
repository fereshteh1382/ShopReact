const { Router } = require("express");
const rezervController = require("../controllers/rezervController");

const router = new Router();

router.post("/add-rezerv", rezervController.handleRezervCustomers);
router.get("/all-rezervs/:userid", rezervController.getAllRezervs);
router.get("/delete-rezerv/:id", rezervController.deleteRezerv);
router.post("/edit-rezerv/:id", rezervController.editRezerv);

module.exports = router;
