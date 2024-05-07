const express =require("express")

const {PrismaClient}= require("@prisma/client")

let app = express()
app.use(express.json())

const prisma = new PrismaClient()


const createSale = async (req, res) => {
    try {
        // Check if required fields are present
        if (!req.body.productID || !req.body.customerID || !req.body.quantity) {
            return res.status(400).json({ error: "productID, customerID, and quantity are required." });
        }

        // Ensure data types are correct
        if (typeof req.body.productID !== "number" || typeof req.body.customerID !== "number" || typeof req.body.quantity !== "number") {
            return res.status(400).json({ error: "productID, customerID, and quantity must be numbers." });
        }

        const newSale = await prisma.sale.create({
            data: req.body
        });
        res.status(201).json(newSale);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};


const allsales = async (req,res)=>{
    try {
        let allproducts=await prisma.sale.findMany();
        res.status(201).json(allproducts)
    } catch (error) {
        console.log(error)
    }
    finally{
        await prisma.$disconnect()
    }
}

let singelsale = async (req, res) => {
    try {
        // Validate productID and customerID
        const productID = parseInt(req.body.productID);
        const customerID = parseInt(req.body.customerID);

        if (isNaN(productID) || isNaN(customerID)) {
            return res.status(400).json({ error: "productID and customerID must be numbers." });
        }

        const certainSale = await prisma.sale.findFirst({
            where: {
                AND: [{
                    productID: productID,
                }, {
                    customerID: customerID
                }]
            }
        });
        res.status(201).json(certainSale);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};

let deletesale = async (req, res) => {
    try {
        // Validate productID and customerID
        const productID = parseInt(req.body.productID);
        const customerID = parseInt(req.body.customerID);

        if (isNaN(productID) || isNaN(customerID)) {
            return res.status(400).json({ error: "productID and customerID must be numbers." });
        }

        const deletedSale = await prisma.sale.delete({
            where: {
                AND: [{
                    productID: productID,
                }, {
                    customerID: customerID
                }]
            }
        });
        res.status(201).json(deletedSale);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};

/*app.put("/updateAsale/:prodectid/:cusromerid"*/let updateAsale = async(req,res)=>{
    try {
        let update = await prisma.sale.update({
            where:{
                productID_customerID:{
                    productID:Number(req.params.prodectid),
                    customerID:Number(req.params.cusromerid)
                },
                data:Number(req.body)
        }})
        res.status(201).json(update)
    } catch (error) {
        console.log(error)
    }
    finally{
        await prisma.$disconnect()
    }
}


module.exports={
    createSale,
    deletesale,
    singelsale,
    allsales,
    updateAsale,
}