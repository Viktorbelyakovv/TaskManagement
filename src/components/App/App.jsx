import React, { useState, useEffect } from "react";
import Container from "../Container";
import Header from "../Header";
import List from "../List";
import {UploadList, DeleteTask, ChangeTitle, ChangeCompleted} from "../../utils/api.js";
import "./App.css";

const App = () => {  
  const [list, setList] = useState([])
  
  const deleteItem = id => {
    DeleteTask(id).then(response => {

      if (response.status === 200) {
        setList(list.filter(item => item.id !== id))
      } else {
        alert("Error status = " + response.status)
      }        
    })
  };

  const changeTitle = (id, title) => {
    ChangeTitle(id, title).then(response => {

      if (response.status === 200) {
        setList(list.map(item => {

          if (item.id === id) {
            item.title = title
          }

          return item
        }))    
      }
      else {
        alert("Error status = " + response.status)
      }        
    })
  };

  const changeCompleted = id => {
    const item = list.find(item => item.id === id)

    if (item) {
      ChangeCompleted(id, !item.completed).then(response => {

        if (response.status === 200) {
          setList(list.map(item => {

            if (item.id === id) {
              item.completed = !item.completed
            }

            return item
          }))      
        } else {
          alert("Error status = " + response.status)
        }        
      })
    }    
  };

  useEffect(() => {
    UploadList().then(list => setList(list));
  }, []);
  
  return (
    <div className="App">
      <Container>        
        <Header list={list} setList={setList}/>
        {list ? 
          <List
            list={list}
            handleCheckbox={changeCompleted}
            changeTitle={changeTitle}
            deleteItem={deleteItem}
          />
         : 
          <h2>No tasks</h2>
        }
      </Container>
    </div>
  );
};

export default App;
