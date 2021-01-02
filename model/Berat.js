const mongoose= require('mongoose')

const beratSchema=new mongoose.Schema({
    max:{
        type:Number,
        required:true
    },
    min:{
        type:Number,
        required:true
    },
    perbedaan:{
        type:Number,
    },
    tanggal:{
        type:Date,
        required:true,
        default:new Date(),
    },

},
{
    timestamps:true,
}
)

module.exports=Berat=mongoose.model('berat',beratSchema)