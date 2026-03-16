import React, { useState, useEffect } from "react";

const Home = () => {

  const username = "pantaleonyy";

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const loadTasks = async () => {
    const response = await fetch(
      `https://playground.4geeks.com/todo/users/${username}`
    );

    const data = await response.json();

    if (data.todos) {
      setTasks(data.todos);
    }
  };

  const createUser = async () => {
    await fetch(
      `https://playground.4geeks.com/todo/users/${username}`,
      { method: "POST" }
    );
  };

  const addTask = async () => {

    if (input.trim() === "") return;

    const task = {
      label: input,
      is_done: false
    };

    await fetch(
      `https://playground.4geeks.com/todo/todos/${username}`,
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    setInput("");
    loadTasks();
  };

  const deleteTask = async (id) => {

    await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      { method: "DELETE" }
    );

    loadTasks();
  };

  const clearAll = async () => {

    for (let task of tasks) {
      await fetch(
        `https://playground.4geeks.com/todo/todos/${task.id}`,
        { method: "DELETE" }
      );
    }

    loadTasks();
  };

  useEffect(() => {
    createUser();
    loadTasks();
  }, []);

  return (
    <div className="container">

      <h1>todos</h1>

      <input
        type="text"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            addTask();
          }
        }}
      />

      <ul>

        {tasks.map(task => (
          <li key={task.id}>

            {task.label}

            <button onClick={()=>deleteTask(task.id)}>
              ❌
            </button>

          </li>
        ))}

      </ul>

      <p>{tasks.length} tasks left</p>

      <button onClick={clearAll}>
        Clear All
      </button>

    </div>
  );
};

export default Home;