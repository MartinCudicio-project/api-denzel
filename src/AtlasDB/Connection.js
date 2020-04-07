const mongoose = require('mongoose');


const URI = "mongodb+srv://mart:mart@aiocluster-m0vw5.mongodb.net/denzel?retryWrites=true&w=majority";
const connectDB = async()=>{
    await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true 
    })
    console.log('db connected..!');
} 

module.exports=connectDB;