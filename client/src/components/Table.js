import React,{useEffect,useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import{Table as TableMu} from "@material-ui/core"
import axios from "axios"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {serverURL} from "../config/serverUrl";
import moment from "moment";
import Button from "@material-ui/core/Button";
import {Link }  from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  boldRow:{
    fontWeight:600,
  }
});

const Table=()=>{
    const classes = useStyles();
    const [loading,setLoading]=useState(false)
    const [berats,setBerat]=useState([])
    const loadBerat=async ()=>{
         setLoading(true)
        try {
            
            const res=await axios.get(`${serverURL}/api/`)
            console.log(res.data)
            setBerat(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        loadBerat()
    },[])
const handleRemove= async (id)=>{
  try {
    const res=await axios.delete(`${serverURL}/api/${id}`)
    console.log(res.data)
    setBerat(berats.filter((berat)=>berat._id !== res.data._id))
  } catch (error) {
    console.log(error)
  }
}
    
    const renderTable=()=>{
       return berats.map(berat=>{
        return(
            <TableRow key={berat._id}>
            <TableCell>{moment(berat.tanggal).format('YYYY-MM-DD')}</TableCell>
            <TableCell>{berat.max}</TableCell>
            <TableCell>{berat.min}</TableCell>
            <TableCell>{berat.perbedaan}</TableCell>
            <TableCell>
              <Link to={`/edit/${berat._id}`}>
                <Button variant="contained" color="primary">Edit</Button>
              </Link>
              <Link to={`/detail/${berat._id}`}>
                <Button variant="contained">Detail</Button>
              </Link>
              <Button variant="contained" color="secondary" onClick={()=> handleRemove(berat._id)}>Hapus</Button>
            </TableCell>
            
          </TableRow>
        )
        })
    }



    return (
        <TableContainer component={Paper}>

      <TableMu className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.boldRow}>Tanggal</TableCell>
            <TableCell className={classes.boldRow}>Min</TableCell>
            <TableCell className={classes.boldRow}>Max</TableCell>
            <TableCell className={classes.boldRow}>Perbedaan</TableCell>
            <TableCell className={classes.boldRow}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {!loading && berats.length>0 && renderTable()}
        </TableBody>
        <Link to="/create">
            <Button variant="contained" color="primary">Create Data</Button>
        </Link>
        
      </TableMu>
    </TableContainer>
    )
}

export default Table