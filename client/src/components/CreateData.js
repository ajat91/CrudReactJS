import React,{useState}from 'react';
import axios from 'axios';
import {serverURL} from "../config/serverUrl";

const CreateData=({history})=>{
        
    
    const [formdata,setFormData]=useState({
        tanggal:'',
        max:0,
        min:0,

    })
    const handleSubmit= async (e)=>{
        e.preventDefault()
        console.log(formdata)
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res =await axios.post(`${serverURL}/api/create`,formdata,config)
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
                    <input type="date" required placeholder="Tanggal" name="tanggal" onChange={(e)=> handleChange(e)}/><br/>
                    <input type="number" required placeholder="Max" min="0" name="max" onChange={(e)=> handleChange(e)}/><br/>
                    <input type="number" required placeholder="Min" min="0" name="min" max={formdata.max} onChange={(e)=> handleChange(e)}/><br/>
                    <button type="submit">Create</button>
                </form>
                
        </div>
        )
}

export default CreateData