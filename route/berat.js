const express=require('express')

const router=express.Router()
const Berat=require('../model/Berat')


//Path GET/api
//Desc get all berat

router.get('/',async(req,res)=>{
    try {
        const berats=await Berat.find({})
        res.status(200).json(berats)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

//Path GET /api/:id
//Desc 
// ini adalah read
router.get('/:id',async(req,res)=>{
    try {
        const berat=await Berat.find({ _id:req.params.id})
        res.status(200).json(berat)

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
 
    }
})

//Path delete
// ini adalah delete
router.delete('/:id',async(req,res)=>{
    try {
        const berat=await Berat.findByIdAndRemove(req.params.id)
        res.status(200).json(berat)

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
 
    }
})
//Path put/api:id
//Desc edit berat
// ini adalah edit
router.put(('/:id'),async (req,res)=>{
    const{max,min,tanggal}=req.body
    try {
        if(max < min){
            res.status(400).json({error:'max harus lebih besar dari min'})
            return
        }
        const updates={max,min,perbedaan:max-min,tanggal}
        const berat=await Berat.findByIdAndUpdate(req.params.id,updates,{
            now:true,
        })
        res.status(200).json(berat)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})



//Path /api/create
//Desc create new berat
// ini adalah create
router.post(('/create'),async (req,res)=>{
    const{max,min,tanggal}=req.body
    try {
        if(max < min){
            res.status(400).json({error:'max harus lebih besar dari min'})
            return
        }
        const berat=new Berat({max,min,perbedaan: max - min ,tanggal})
        await berat.save()

        res.status(200).json(berat)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

module.exports=router