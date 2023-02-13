const mongoose=require("mongoose")

async function getData(){
    try{
        // await mongoose.connect("mongodb+srv://abhinav0011:welcome0011@cluster0.dprrrwl.mongodb.net/emailverify")
        await mongoose.connect("mongodb://localhost:27017/verifyemail")
        console.log("Database is Connected....");
    }
    catch(error){
        console.log("Something went wrong in database connection!!!!!");
    }
}

getData()