const express = require("express");
const customerRouter = express.Router();

const {allcustomers,oneUser,creatUser,update,deletCustomer}=require("../controler/customer_controler.js")


customerRouter.route("/customer")
    .get(allcustomers)
    .post(creatUser);


customerRouter.route("/customer/:id")
    .get(oneUser)
    .put(update)
    .delete(deletCustomer);



module.exports = customerRouter;