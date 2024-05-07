const express = require("express");

const companyRouter = express.Router();

const {creatCompany,allcompanys,findeAcompany,UpdateCompany,deleteCumpany} = require("../controler/compnay_controler");



companyRouter.route("/company")
    .get(allcompanys)
    .post(creatCompany);

companyRouter.route("/company/:id")
    .get(findeAcompany)
    .put(UpdateCompany)
    .delete(deleteCumpany);


module.exports= companyRouter