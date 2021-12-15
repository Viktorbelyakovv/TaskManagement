import React from 'react';
import Container from '../Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import './App.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const App = () => {
  return (
    <Container>
      <div className="App">
        <div className="Container">
        <TextField label="Task name" variant="outlined"/>
        <Button variant="outlined" size="large">Add</Button>
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
