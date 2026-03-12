/**
 * Routes for Category resource
 */

const authMw = require("../middlewares/auth.mw")
const categoryMw = require("../middlewares/category.mw")
const category_controller = require("../controllers/category.controller")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/categories", [authMw.verifyToken, authMw.isAdmin, categoryMw.validateCategoryBody], category_controller.createNewCategory)

    app.get("/ecomm/api/v1/categories", category_controller.findAllCategories)

    app.get("/ecomm/api/v1/categories/:id", category_controller.findCategoryById)

    app.put("/ecomm/api/v1/categories/:id", [authMw.verifyToken, authMw.isAdmin, categoryMw.validateCategoryBody], category_controller.updateCategory)
}