const category_model = require("../models/category.model");

/**
 * Middleware to validate the product request body
 */
const validateProductBody = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! Product name is not provided"
        });
    }
    if (!req.body.description) {
        return res.status(400).send({
            message: "Failed! Product description is not provided"
        });
    }
    if (!req.body.price || req.body.price <= 0) {
        return res.status(400).send({
            message: "Failed! Valid Product price is not provided"
        });
    }
    if (!req.body.categoryId) {
        return res.status(400).send({
            message: "Failed! Category ID is not provided"
        });
    }

    // Validate if the categoryId exists
    try {
        const category = await category_model.findOne({ _id: req.body.categoryId });
        if (!category) {
            return res.status(400).send({
                message: "Failed! Category ID provided is invalid"
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: "Error while validating the category ID"
        });
    }

    next();
};

module.exports = {
    validateProductBody: validateProductBody
};
