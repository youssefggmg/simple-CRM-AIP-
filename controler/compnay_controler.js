const express = require('express');
const {PrismaClient} = require('@prisma/client')

const app = express();
const prisma = new PrismaClient();

app.use(express.json())

// creat company

const creatCompany = async (req, res) => {
    try {
        if (!req.body.businessName || !req.body.email) {
            return res.status(400).json({ error: "Name and location are required." });
        }

        if (typeof req.body.businessName !== "string" || typeof req.body.businessName !== "string") {
            return res.status(400).json({ error: "Name and location must be strings." });
        }

        let newCompany = await prisma.companyProfile.create({
            data: req.body
        })
        res.status(202).json(newCompany);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
    finally {
        await prisma.$disconnect();
    }
};

const allcompanys = async(req,res)=>{
    try {
        let allcompanys = await prisma.companyProfile.findMany({})
        res.status(201).json(allcompanys)
    } catch (error) {
        console.log(error)
    }
    finally{
        await prisma.$disconnect()
    }
}


let findeAcompany = async (req, res) => {
    try {
        // Validate company ID
        const companyId = parseInt(req.params.id);
        if (isNaN(companyId)) {
            return res.status(400).json({ error: "Invalid company ID." });
        }

        let acompany = await prisma.companyProfile.findUnique({
            where: {
                companyID: companyId
            }
        });
        res.status(201).json(acompany);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
    finally {
        await prisma.$disconnect();
    }
};


let UpdateCompany = async (req, res) => {
    try {
        // Validate company ID
        const companyId = parseInt(req.params.id);
        if (isNaN(companyId)) {
            return res.status(400).json({ error: "Invalid company ID." });
        }

        // Check if there is any data to update
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data provided for update." });
        }

        const update = await prisma.companyProfile.update({
            where: {
                companyID: companyId
            },
            data: req.body
        });
        res.status(201).json(update);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
    finally {
        await prisma.$disconnect();
    }
};


let deleteCumpany = async (req, res) => {
    try {
        // Validate company ID
        const companyId = parseInt(req.params.id);
        if (isNaN(companyId)) {
            return res.status(400).json({ error: "Invalid company ID." });
        }

        const deleteCompany = await prisma.companyProfile.delete({
            where: {
                companyID: companyId
            }
        });
        res.status(201).json(deleteCompany);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
    finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    creatCompany,
    allcompanys,
    findeAcompany,
    UpdateCompany,
    deleteCumpany
}