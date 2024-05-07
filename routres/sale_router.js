const express = require("express");

const saleRoute = express.Router();

const{createSale,deletesale,singelsale,allsales,updateAsale,} =require("../controler/sale_controler")


saleRoute.route("/sale")
    .get(allsales)
    .post(createSale);


saleRoute.route("/saleUniq")
    .get(singelsale)
    .delete(deletesale);


    saleRoute.route("/sale/:id/id")
    .put(updateAsale);


module.exports = saleRoute