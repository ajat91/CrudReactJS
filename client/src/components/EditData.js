import React,{useState,useEffect}from 'react';
import axios from 'axios';
import {serverURL} from "../config/serverUrl";

const EditData=({history,match})=>{
        
    
    const [formdata,setFormData]=useState({
        tanggal:'',
        max:0,
        min:0,

    })

const loadBerat=async ()=>{
    try {
        const res = await axios.get(`${serverURL}/api/${match.params.id}`)
        console.log(res.data)
        setFormData({ 
            ...formdata,
            tanggal:res.data[0].tanggal,
            max:res.data[0].max,
            min:res.data[0].min,
        })
        } catch (error) {
            console.log(error)
            
        }      
}


    useEffect(()=>{
        loadBerat()
    },[])

    const handleSubmit= async (e)=>{
        e.preventDefault()
        console.log(formdata)
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res =await axios.put(`${serverURL}/api/${match.params.id}`,formdata,config)
            console.log(res.data);
            
            setFormData({  
                tanggal:'',
                max:0,
                min:0,
            });
            history.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange=(e)=>{
        setFormData({
            ...formdata,
            [e.target.name]:e.target.value,
        })
    }
        return (

        <div>
           
                <form style={{textAlign:"center"}} onSubmit={(e)=> handleSubmit(e)}>
                    <input type="date" required placeholder="Tanggal" value={formdata.tanggal} name="tanggal" onChange={(e)=> handleChange(e)}/><br/>
                    <input type="number" required placeholder="Max" min="0" value={formdata.max} name="max" onChange={(e)=> handleChange(e)}/><br/>
                    <input type="number" required placeholder="Min" min="0" value={formdata.min} name="min" max={formdata.max} onChange={(e)=> handleChange(e)}/><br/>
                    <button type="submit">Edit</button>
                </form>
                
        </div>
        )
}

export default EditData