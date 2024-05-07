const express = require("express");

const app = express();

app.use(express.json());

const company = require("./routres/company_router")

const customer = require("./routres/customer_router")

const product = require("./routres/product_router")

const sale = require("./routres/sale_router")


app.use(company);

app.use(customer);

app.use(product);

app.use(sale);


const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{console.log("Server Listening on port: ", PORT);})


// import express from "express";
//       app.use(routeName);  
//       const PORT = process.env.PORT || 8080;
//         app.listen(PORT, () => {   console.log("Server Listening on port: ", PORT); });