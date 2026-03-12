/**
 * Routes for Product resource
 */

const authMw = require("../middlewares/auth.mw");
const productMw = require("../middlewares/product.mw");
const product_controller = require("../controllers/product.controller");

module.exports = (app) => {
    app.post("/ecomm/api/v1/products", [authMw.verifyToken, authMw.isAdmin, productMw.validateProductBody], product_controller.createProduct);

    app.get("/ecomm/api/v1/products", product_controller.findAllProducts);

    app.get("/ecomm/api/v1/products/:id", product_controller.findProductById);

    app.put("/ecomm/api/v1/products/:id", [authMw.verifyToken, authMw.isAdmin, productMw.validateProductBody], product_controller.updateProduct);

    app.delete("/ecomm/api/v1/products/:id", [authMw.verifyToken, authMw.isAdmin], product_controller.deleteProduct);
};
