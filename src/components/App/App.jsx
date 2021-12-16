import React, {useState} from 'react';
import Container from '../Container';
import List from '../List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './App.css';

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
  const [task, setTask] = useState('')
  const [list, setList] = useState(['Find a habitable planet', 'Move to the found planet', 'Destroy the Earth!'])
  function handleChange(event) {    
    setTask(event.target.value)
  }
  function handleSubmit() {
    if (task.trim()) {
      setList(list.concat(task))
      setTask('')
    }    
  }
  return (
    <Container>
      <div className="App">
        <div className="Container">
          <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
          <div className="Header">
            <CssTextField 
              sx={{ width: '60%', height:'50px', margin:'10px' }} 
              label="Task name"
              value={task}
              onChange={handleChange}              
              onKeyPress={(e) => {if (e.key === 'Enter') handleSubmit()}}
            /> 
            <CssTextField 
              sx={{ width: '10%', height:'50px', margin:'10px' }} 
              //select
            />
            <CssButton 
              sx={{ width: '10%', height:'55px', margin:'10px' }} 
              variant="outlined"
              onClick={handleSubmit}
            >
            Add
            </CssButton>
          </div>
          <List list={list}/>          
        </div>      
      </div>
    </Container>    
  );
}

export default App;
