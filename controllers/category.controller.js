const category_model = require("../models/category.model")

/**
 * Controller for creating the category
 * 
 *   POST localhost:8080/ecomm/api/v1/categories
 * 
 *   {
       "name" : "Household",
        "description" : "This will have all the household items "
     }
 */
exports.createNewCategory = async (req, res)=>{

    //Read the req body
    //Create the category object
    const cat_data = {
        name : req.body.name,
        description : req.body.description
    }
    try{
       //Insert into mongodb
       const category = await category_model.create(cat_data)
       return res.status(201).send(category)
    }catch(err){
        console.log("Error while creating the category", err)
        return res.status(500).send({
            message : "Error while creating the category"
        })
    }
}

/**
 * Controller for getting all the categories
 */
exports.findAllCategories = async (req, res) => {
    try {
        const categories = await category_model.find();
        return res.status(200).send(categories);
    } catch (err) {
        console.log("Error while fetching the categories", err);
        return res.status(500).send({
            message: "Error while fetching the categories"
        });
    }
}

/**
 * Controller for getting a category based on the id
 */
exports.findCategoryById = async (req, res) => {
    try {
        const category = await category_model.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }
        return res.status(200).send(category);
    } catch (err) {
        console.log("Error while fetching the category", err);
        return res.status(500).send({
            message: "Error while fetching the category"
        });
    }
}

/**
 * Controller for updating a category
 */
exports.updateCategory = async (req, res) => {
    try {
        const category = await category_model.findOneAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description
        }, { new: true });

        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }
        return res.status(200).send(category);
    } catch (err) {
        console.log("Error while updating the category", err);
        return res.status(500).send({
            message: "Error while updating the category"
        });
    }
}