const { Schema, model } = require('mongoose')
const ProductSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

const Products = model('product', ProductSchema)
module.exports = Products
