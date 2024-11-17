const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv")
dotenv.config({path:"./.env"});
const adminRoute = require("./src/route/order");
const sellerRoute = require("./src/route/seller");
const userRoute = require("./src/route/user");

const app = express()
app.use(express.json());
app.use(cors());


app.use("/api/admin",adminRoute)
app.use("/api/seller",sellerRoute)
app.use("/api/user",userRoute);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongodb connected!!")
}).catch((error)=>{
    console.log(error.message)
})

port = process.env.PORT
app.listen(port, function(){
    console.log(`app is listening on port ${port}`)
})