import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function ValidationTextFields({handleClose,handleOpen}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showText, setShowText] = useState(false);
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
          label="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          focused
          InputProps={{
            startAdornment: <InputAdornment position="start">Name:</InputAdornment>,
          }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          focused
          InputProps={{
            startAdornment: <InputAdornment position="start">Email:</InputAdornment>,
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          focused
          InputProps={{
            startAdornment: <InputAdornment position="start">Password:</InputAdornment>,
          }}
          helperText={showText ? "WRONG CREDENTIALS" : " "}
        />
        <FormControl>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="faculty">Faculty</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="restaurant">Restaurant</MenuItem>
            <MenuItem value="library">Library</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="success" onClick={async () => {
            if (name.length <= 2 || email.length <= 2 || password.length <= 2 || role === "") {
              setShowText(true);
              return;
            }

            const postData = {
              name: name,
              email: email,
              password: password,
              role: role
            };
            postDataFromApi("/user/register", postData, handleClose)
            .then((res)=>{
              console.log("REGISTERED DATA:", res.data);
              navigate("/login")
              // Handle success scenario
            })
            .catch((err) => {
              console.error(err);
              // Handle error scenario
            });
        }}>
            Register
        </Button>
      </div>
    </Box>
  );
}
