import React, {useState} from 'react';
import Container from '../Container';
import List from '../List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './App.css';

const CssTextField = styled(TextField)({
  height:'50px', 
  width: '60%',
  margin:'10px',
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

const CssSelect = styled(TextField)({
  height:'50px', 
  width: '10%',
  margin:'10px',
});

const CssButton = styled(Button)({   
  height:'55px', 
  width: '10%',
  margin:'10px',
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
  const [list, setList] = useState([{id: 1, completed: false, title: 'Find a habitable planet'},
                                    {id: 2, completed: true, title: 'Move to the found planet'},
                                    {id: 3, completed: false, title: 'Destroy the Earth'}])
  const handleChange = (e) => {
    e.preventDefault()
    setTask(e.target.value)
  }
  const handleSubmit = () => {
    if (task.trim()) {
      setList(list.concat({id: Date.now(), completed: false, title: task}))
      setTask('')
    }
  }
  const handleCheckbox = (id) => {
    setList(list.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    }))
  }
  const changeTitle = (id, title) => {
    setList(list.map(item => {
      if (item.id === id) {
        item.title = title
      }
      return item
    }))
  }
  const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id))
  }
  return (
    <Container>
      <div className="App">
        <div className="Container">
          <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
          <div className="Header">
            <CssTextField 
              label="Task name"
              value={task}
              onChange={handleChange}              
              onKeyPress={(e) => {if (e.key === 'Enter') handleSubmit()}}
            /> 
            <CssSelect/>
            <CssButton 
              variant="outlined"
              onClick={handleSubmit}
            >
            Add
            </CssButton>
          </div>
          <div>
            {list.length?
              <List 
                list={list} 
                handleCheckbox={handleCheckbox} 
                changeTitle = {changeTitle}
                deleteItem={deleteItem}
              /> :
              <h2>No tasks</h2>
            }             
          </div>                   
        </div>      
      </div>
    </Container>    
  );
}

export default App;
