const product_model = require("../models/product.model");

/**
 * Controller for creating a product
 */
exports.createProduct = async (req, res) => {
    const product_data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId
    };

    try {
        const product = await product_model.create(product_data);
        return res.status(201).send(product);
    } catch (err) {
        console.log("Error while creating the product", err);
        return res.status(500).send({
            message: "Error while creating the product"
        });
    }
};

/**
 * Controller for getting all products
 * Supports filtering by categoryId and searching by name
 */
exports.findAllProducts = async (req, res) => {
    let queryObj = {};
    if (req.query.categoryId) {
        queryObj.categoryId = req.query.categoryId;
    }
    if (req.query.name) {
        queryObj.name = { $regex: req.query.name, $options: 'i' };
    }

    try {
        const products = await product_model.find(queryObj);
        return res.status(200).send(products);
    } catch (err) {
        console.log("Error while fetching the products", err);
        return res.status(500).send({
            message: "Error while fetching the products"
        });
    }
};

/**
 * Controller for getting a single product by ID
 */
exports.findProductById = async (req, res) => {
    try {
        const product = await product_model.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        return res.status(200).send(product);
    } catch (err) {
        console.log("Error while fetching the product", err);
        return res.status(500).send({
            message: "Error while fetching the product"
        });
    }
};

/**
 * Controller for updating a product
 */
exports.updateProduct = async (req, res) => {
    try {
        const product = await product_model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        return res.status(200).send(product);
    } catch (err) {
        console.log("Error while updating the product", err);
        return res.status(500).send({
            message: "Error while updating the product"
        });
    }
};

/**
 * Controller for deleting a product
 */
exports.deleteProduct = async (req, res) => {
    try {
        const product = await product_model.deleteOne({ _id: req.params.id });
        if (product.deletedCount == 0) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        return res.status(200).send({
            message: "Product deleted successfully"
        });
    } catch (err) {
        console.log("Error while deleting the product", err);
        return res.status(500).send({
            message: "Error while deleting the product"
        });
    }
};
