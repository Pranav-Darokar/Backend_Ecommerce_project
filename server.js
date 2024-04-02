/**
 * This will be the starting file of project
 */
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config =require("./configs/server.config")
const db_config = require("./configs/db.configs")
const user_model = require("./models/user.model")
const secret = require("./configs/auth.config")
const bcrypt = require("bcryptjs")

app.use(express.json()) // Middelwave
/**
 * Created an admin user at the starting of the application
 * if not already present
 */

//connection with mongodb

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error" , ()=>{
    console.log("Error While connecting to mongoDB")
})

db.once("open", ()=>{
    console.log("Connected to mongodb")

    init()
})

async function init(){
    try{
        let user  = await user_model.findOne({userId : "admin"})

       if(user){
          console.log("Admin is already present")
          return
        }

    }catch(err){
        console.log("Error while reading the data", err)
    }
    

    try{
      user = await user_model.create({
        name : "Pranav",
        userId : "admin",
        email : "pranavd96@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("Welcome1",8)
      })
      console.log("Admin created ", user)


    }catch(err){
        console.log("Error while create admin", err)
    }
}

/***
 * Stich routes to the server
 */

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)


app.get("/",(req,res)=>{
    res.send(" <h1> Hello from Node, from inside a docker container...</h1>")
})
/**
 * Start ther server
 */
  app.listen(server_config.PORT, ()=>{
    console.log("Server started at port num : " , server_config.PORT)
})

