let express = require("express");
let {PrismaClient} = require("@prisma/client");

let app = express();
let prisma = new PrismaClient;

app.use(express.json());

const creatAproduct = async (req, res) => {
    try {
        // Check if required fields are present
        if (!req.body.companyID || !req.body.buyPrice) {
            return res.status(400).json({ error: "Name and price are required." });
        }

        // Ensure data types are correct
        if (typeof req.body.companyID !== "number" || typeof req.body.buyPrice !== "number") {
            return res.status(400).json({ error: "companyID must be a number and price must be a number." });
        }

        const newProduct = await prisma.product.create({
            data: req.body
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};

const allProducts =async (req,res)=>{
    try {
        let allproducts=await prisma.product.findMany();
        res.status(201).json(allproducts)
    } catch (error) {
        console.log(error)
    }
    finally{
        await prisma.$disconnect()
    }
};


const aProduct = async (req, res) => {
    try {
        // Validate product ID
        const productId = Number(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const certainProduct = await prisma.product.findUnique({
            where: {
                productID: productId
            }
        });
        res.status(201).json(certainProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};


const updateProduct = async (req, res) => {
    try {
        // Validate product ID
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        // Check if there is any data to update
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data provided for update." });
        }

        const updatedProduct = await prisma.product.update({
            where: {
                productID: productId
            },
            data: req.body
        });
        res.status(201).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};

const deleteproduct = async (req, res) => {
    try {
        // Validate product ID
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID." });
        }

        const deletedProduct = await prisma.product.delete({
            where: {
                productID: productId
            }
        });
        res.status(201).json(deletedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};


module.exports = {
    allProducts,
    aProduct,
    creatAproduct,
    updateProduct,
    deleteproduct
}