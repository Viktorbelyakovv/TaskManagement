import React from 'react';
import Container from '../Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import './App.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'rgb(130, 50, 50)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: 'rgb(250, 235, 96)',
      borderWidth: 2,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(241, 93, 93)',
      borderWidth: 2,
    },
  },
});

const CssButton = styled(Button)({
  color: 'black',
  borderColor: 'black',
  borderWidth: 2,
  '&:active': {
    backgroundColor: 'rgb(241, 93, 93)',
    borderColor: 'rgb(241, 93, 93)',
    borderWidth: 2,
  },
  '&:hover': {
    borderColor: 'rgb(250, 235, 96)',
    borderWidth: 2,
  },
});

const App = () => {
  return (
    <Container>
      <div className="App">
        <div className="Container">
          <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
          <CssTextField sx={{ width: '60%', height:'50px', margin:'10px' }} label="Task name" variant="outlined" color="secondary"/>
          <CssTextField sx={{ width: '10%', height:'50px', margin:'10px' }} select/>
          <CssButton sx={{ width: '10%', height:'55px', margin:'10px' }} variant="outlined">Add</CssButton>
          <br></br>
          <Checkbox {...label} defaultChecked />
          <TextField defaultValue="Task1" variant="standard"/>
          <IconButton>
            <ClearIcon/>
          </IconButton>
        </div>      
      </div>
    </Container>    
  );
}

export default App;
