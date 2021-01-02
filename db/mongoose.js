const mongoose=require('mongoose');

const connectDb= async ()=>{
    try {
     await mongoose.connect(
         'mongodb+srv://bootcamp:bootcamp123@cluster0.osg3o.mongodb.net/Berat?retryWrites=true&w=majority' ,
         {
            useNewUrlParser:true,
            useUnifiedTopology:true,
         }
     )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports=connectDb