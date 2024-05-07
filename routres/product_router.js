const express = require("express");

const productRoute = express.Router();

const {allProducts,aProduct,creatAproduct,updateProduct,deleteproduct} = require("../controler/product_controler")


productRoute.route("/product")
    .get(allProducts)
    .post(creatAproduct);


    productRoute.route("/product/:id")
    .get(aProduct)
    .put(updateProduct)
    .delete(deleteproduct);



module.exports = productRoute;