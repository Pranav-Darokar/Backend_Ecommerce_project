const mongoose = require("mongoose");

/**
 * Product Schema
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Product", productSchema);
