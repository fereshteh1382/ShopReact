const { Router } = require("express");

const customersController = require("../controllers/customersController");
const router = new Router();


router.post("/add-customers", customersController.handleRegisterCustomers);
router.get("/all-customers/:userid", customersController.getAllCustomers);
router.get("/delete-customers/:id", customersController.deleteCustomer);
router.post("/edit-customers/:id", customersController.editCustomer);
router.get("/single-customer/:id", customersController.getSingleCustomer);
router.get("/sms-customers/:userid/:customernumbers/:message", customersController.smsCustomer);
router.post("/sms-allcustomers/:userid/:message", customersController.smstoAllCustomers);
router.get("/search-customer/:userid/:name", customersController.getSearchCustomer);

module.exports = router;
