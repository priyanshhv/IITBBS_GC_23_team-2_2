import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ValidationTextFields from './ValidationTextFields';

const Login = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: "#aeb4ffd9"}}
        open={open}
      >
        <ValidationTextFields handleClose={handleClose} handleOpen={handleOpen}/>
        {/* <CircularProgress color="inherit" /> */}
      </Backdrop>
    </div>
  );
}

export default Login;
