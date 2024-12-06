const { connect } = require("mongoose")
require('dotenv').config()
const Products = require('./model')

const getProducts = async (req, res) => {

    try {
        const products = await Products.find()
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const postProducts = async (req, res) => {
    const { productName, description, price, quantity } = req.body

    if (!productName || !description || !price || !quantity) {
        res.status(400).json({ message: 'Invalid Payload' })
    }

    else {
        try {
            const checkExisting = await Products.exists({ productName })
            if (checkExisting) {
                res.status(403).json({ message: "Product Already Exists" })
            }
            else {
                await Products.create({ productName, description, price, quantity })
                const products = await Products.find()
                res.status(201).json({
                    message: "Product Created Successfully",
                    products
                })
            }

        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}


const ProductbyId = async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        res.status(403).json({ message: "Please Give Product id" })
    }
    else {

        const products = await Products.findOne({ _id })
        res.json({ products })
    }
}

module.exports = { getProducts, postProducts, ProductbyId }