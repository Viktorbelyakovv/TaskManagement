import React, { useState, useEffect } from "react";
import Container from "../Container";
import Header from "../Header";
import List from "../List";
import {UploadList, DeleteTask, ChangeTitle, ChangeCompleted} from "../../utils/api.js";
import "./App.css";

const App = () => {  
  const [list, setList] = useState([]);  

  const refresh = () => {
    setTimeout(() => {
      UploadList().then((list) => {
        setList(list);
      });
    }, 300)
  }

  const deleteItem = (id) => {
    DeleteTask(id);
    refresh()
  };

  const changeTitle = (id, title) => {
    ChangeTitle(id, title);
    refresh()
  };

  const changeCompleted = (id) => {
    const item = list.find((item) => item.id === id);
    if (item !== undefined) {
      ChangeCompleted(id, !item.completed);
      refresh()
    }    
  };

  useEffect(() => {
    UploadList().then((list) => {
      setList(list);
    });
  }, []);
  
  return (
    <div className="App">
      <Container>
        <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
        <Header refresh={refresh}/>
        {list ? (
          <List
            list={list}
            handleCheckbox={changeCompleted}
            changeTitle={changeTitle}
            deleteItem={deleteItem}
          />
        ) : (
          <h2>No tasks</h2>
        )}
      </Container>
    </div>
  );
};

export default App;
