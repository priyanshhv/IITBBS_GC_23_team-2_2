import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { postMenuItemToApi } from '../../utils/api';


const SetMenu = () => {
    const navigate = useNavigate();
    useEffect(() => {
    const accessToken = localStorage.getItem("accessTokenCafe");
    // console.log(accessToken);
    if (!accessToken) {
      navigate("/login")
    }
  }, []);

   const [title,setTitle] = useState("");
   const [desc,setDesc] = useState("");
   const [img,setImg] = useState("");
   const [category,setCategory] = useState("");
   const [price,setPrice] = useState(0);
  
  return (
    <Container maxWidth="sm" >
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width:"100%" ,   display:'flex', justifyContent:"center",alignItems:"center" ,'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
          
          <div style={{
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:'space-between'
      }}>
        <TextField
        //   error
          label="Title" 
          //color="secondary" 
          sx={{
                input: {
                color: "blue",
                }
            }}
          onChange={(e)=>setTitle(e.target.value)}
          focused
         
        />
         <TextField
        //   error
          label="Category" 
          //color="secondary" 
          sx={{
                input: {
                color: "blue",
                }
            }}
          onChange={(e)=>setCategory(e.target.value)}
          focused
         
        />
         <TextField
        //   error
          label="Price" 
          //color="secondary" 
          sx={{
                input: {
                color: "blue",
                }
            }}
          onChange={(e)=>setPrice(Number(e.target.value))}
          focused
         
        />
        <TextField
          label="Dsescription" 
         // color="secondary" 
         sx={{
                input: {
                color: "blue",
                }
            }}
          onChange={(e)=>setDesc(e.target.value)}
          focused
             multiline
            rows={4}
          // helperText={showText?"WRONG CREDENTIALS":" "}
        />
         <TextField
          label="Image Link" 
         // color="secondary" 
         sx={{
                input: {
                color: "blue",
                }
            }}
          onChange={(e)=>setImg(e.target.value)}
          focused
             multiline
            rows={2}
          // helperText={showText?"WRONG CREDENTIALS":" "}
        />
        
        <Button variant="contained" color="success" onClick={async ()=>{
            //handleClose()
            // if(username.length<=2 || password.length<=2){
            // setShowText(true)
            // return;
            // }

            const postData = {
              title : title,
              dsesc: desc,
              img : img,
              categories : [category],
              price : price
            };

            const accessToken = localStorage.getItem("accessTokenCafe");
            // console.log(postData)
            postMenuItemToApi("/products",postData,accessToken).then(res=>{
              navigate("/table/1")
            })
            .catch(err=>{
              // console.log(err);
              navigate("/login");
            })
            // postDataFromApi("/auth/login",postData,handleClose)
            // .then((res)=>{
            //   console.log("LOGIN DATA:", res.data.accessToken);
            //   localStorage.setItem("accessTokenCafe", res.data.accessToken);
            //   navigate("/setMenu")
            // })
            // .catch((err) => {
            //     navigate("*")
            // });
        }}>
            Submit 
        </Button>
      </div>

        </Box>
      </Container>
  );
}

export default SetMenu;
