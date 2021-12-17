import React, { useState, useEffect } from "react";
import Container from "../Container";
import List from "../List";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  UploadList,
  AddTask,
  DeleteTask,
  ChangeTitle,
  ChangeCompleted,
} from "../../utils/api.js";
import "./App.css";

const CssTextField = styled(TextField)({
  height: "50px",
  width: "60%",
  margin: "10px",
  "& label.Mui-focused": {
    color: "rgb(130, 50, 50)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "rgb(250, 235, 96)",
      borderWidth: 2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(241, 93, 93)",
      borderWidth: 2,
    },
  },
});

const CssSelect = styled(TextField)({
  height: "50px",
  width: "10%",
  margin: "10px",
});

const CssButton = styled(Button)({
  height: "55px",
  width: "10%",
  margin: "10px",
  color: "black",
  borderColor: "black",
  borderWidth: 2,
  "&:active": {
    backgroundColor: "rgb(241, 93, 93)",
    borderColor: "rgb(241, 93, 93)",
    borderWidth: 2,
  },
  "&:hover": {
    borderColor: "rgb(250, 235, 96)",
    borderWidth: 2,
  },
});

const App = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };
  const refresh = () => {
    setTimeout(() => {
      UploadList().then((list) => {
        setList(list);
      });
    }, 300)
  }
  const addTask = () => {
    if (task.trim()) {
      AddTask(task);
      setTask("");
    }
    refresh()
  };
  const deleteItem = (id) => {
    DeleteTask(id);
    refresh()
  };
  const changeTitle = (id, title) => {
    ChangeTitle(id, title);
    refresh()
  };
  const changeCompleted = (id) => {
    let item = list.find((item) => item.id === id);
    ChangeCompleted(id, !item.completed);
    refresh()
  };
  useEffect(() => {
    UploadList().then((list) => {
      setList(list);
    });
  }, []);
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
              onKeyPress={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />
            <CssSelect />
            <CssButton variant="outlined" onClick={addTask}>
              Add
            </CssButton>
          </div>
          <div>
            {list.length ? (
              <List
                list={list}
                handleCheckbox={changeCompleted}
                changeTitle={changeTitle}
                deleteItem={deleteItem}
              />
            ) : (
              <h2>No tasks</h2>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default App;
