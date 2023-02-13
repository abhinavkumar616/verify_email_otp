const express=require("express")
const User=require("./models/User")
const erouter=require("./routes/emailRoutes")
require("./dbConnect")
const app=express()
app.use(express.json())

app.use("/",erouter)

app.listen(8000,()=>{
    console.log("server is running on port 8000");
})