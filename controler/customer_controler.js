const express = require("express");
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// creating a user

const creatUser = async (req, res) => {
    try {
        // Check if required fields are present
        if (!req.body.customerName || !req.body.customerEmail) {
            return res.status(400).json({ error: "Name and email are required." });
        }

        // Ensure data types are correct
        if (typeof req.body.customerName !== "string" || typeof req.body.customerEmail !== "string") {
            return res.status(400).json({ error: "Name and email must be strings." });
        }

        const newCustomer = await prisma.customer.create({
            data: req.body
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await prisma.$disconnect();
    }
};



// showall the users 

let allcustomers = async(req,res)=>{
    try {
        const showUsers = await prisma.customer.findMany();
        res.status(201).json(showUsers)
    } catch (error) {
        console.log(error);
        res.status(500).send("inter server Error");
    }
    finally{
        await prisma.$disconnect();
    }
}

// show one user

let oneUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        const showTheUser = await prisma.customer.findUnique({
            where: {
                ID: userId
            }
        });
        res.status(201).json(showTheUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};

// update a user

let update = async (req, res) => {
    console.log("connect");
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        // Check if there is any data to update
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data provided for update." });
        }

        const updatedUser = await prisma.customer.update({
            where: {
                ID: userId
            },
            data: req.body
        });
        res.status(201).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};

const deletCustomer = async (req, res) => {
    try {
        // Validate user ID
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        const deletedCustomer = await prisma.customer.delete({
            where: {
                ID: userId
            }
        });
        res.status(201).json(deletedCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await prisma.$disconnect();
    }
};




module.exports ={
    allcustomers,
    oneUser,
    creatUser,
    update,
    deletCustomer
}