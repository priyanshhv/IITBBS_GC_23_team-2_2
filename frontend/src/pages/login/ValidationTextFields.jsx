import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment } from '@mui/material';
import { useState } from 'react';
// import { postDataFromApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function ValidationTextFields({handleClose,handleOpen}) {
  const [email,setemail] = useState("");
  const [password,setPassword] = useState("");
  const [showText,setShowText] = useState(false);
  const navigate = useNavigate();

  const postDataFromApi = async (url,postData,handleClose) => {

    try {
        const data = await axios.post(
            "http://localhost:5000/api"+url,postData
        );       
        handleClose();
       
        return data;
    } catch (error) {
        handleClose();
        throw new Error(error);
        // console.log("Errapijs", error);
    }
}

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
         backdropFilter: "blur(3px)",
         color: "orange !important"
        // backgroundColor:'#60afff4a'
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:'space-between'
      }}>
        <TextField
        //   error
          label="required" 
          //color="secondary" 
          sx={{
                input: {
                color: "blue",
                }
            }}
          onChange={(e)=>setemail(e.target.value)}
          focused
          InputProps={{
            startAdornment: <InputAdornment position="start">Email:</InputAdornment>,
          }}
        />
        <TextField
          label="required" 
         // color="secondary" 
         sx={{
                input: {
                color: "blue",
                }
            }}
          onChange={(e)=>setPassword(e.target.value)}
          focused
          InputProps={{
            startAdornment: <InputAdornment position="start">Password:</InputAdornment>,
          }}
          helperText={showText?"WRONG CREDENTIALS":" "}
        />
        
        <Button variant="contained" color="success" onClick={async ()=>{
            //handleClose()
            if(email.length<=2 || password.length<=2){
            setShowText(true)
            return;
            }

            const postData = {
              email : email,
              password :password
            };
            postDataFromApi("/user/login",postData,handleClose)
            .then((res)=>{
              console.log("LOGIN DATA:", res.data.token);
              localStorage.setItem("accessTokenUser", res.data.token);
              navigate("/table/1")
            })
            .catch((err) => {
                navigate("*")
            });
        }}>
            Submit 
        </Button>
      </div>
    </Box>
  );
}
