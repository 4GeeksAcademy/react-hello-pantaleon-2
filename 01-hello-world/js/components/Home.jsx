import React, { useState, useEffect } from "react";

const Home = () => {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch("https://playground.4geeks.com/todo/users/jey_lopez")
      .then((response) => {
        if (response.status === 404) {
          createUser();
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/jey_lopez", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 400 || response.status === 200) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      fetch("https://playground.4geeks.com/todo/todos/jey_lopez", {
        method: "POST",
        body: JSON.stringify({
          label: inputValue,
          is_done: false,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos((todos) => [...todos, data]);
          setInputValue("");
        });
    }
  };

  const deleteTask = (id) => {
    fetch("https://playground.4geeks.com/todo/todos/" + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status === 404 || response.status === 204) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="todo-container">
      <h1 className="title">todos</h1>

      <div className="todo-card">
        <input
          type="text"
          placeholder="Escribe una tarea y presiona Enter"
          className="todo-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ul className="todo-list">
          {!!todos && todos.length === 0 ? (
            <p className="empty">No hay tareas, añadir tareas</p>
          ) : (
            !!todos &&
            todos.map((task, index) => (
              <li key={index} className="todo-item">
                <span>
                  {index + 1}. {task.label}
                </span>

                <span
                  className="delete-icon"
                  onClick={() => deleteTask(task.id)}
                >
                  X
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
