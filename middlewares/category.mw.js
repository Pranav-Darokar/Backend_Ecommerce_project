/**
 * Middleware to validate the category request body
 */
const validateCategoryBody = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! Category name is not provided"
        });
    }
    if (!req.body.description) {
        return res.status(400).send({
            message: "Failed! Category description is not provided"
        });
    }
    next();
};

module.exports = {
    validateCategoryBody: validateCategoryBody
};
