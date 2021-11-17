import './todos.scss';
import { useState } from "react";

function Todo() {
  // const [todos, setTodo] = useState(JSON.parse(window.localStorage.getItem("data")));
  const [todos, setTodo] = useState(JSON.parse(window.localStorage.getItem("data")));
  // const [todos, setTodo] = useState([]);
  window.localStorage.setItem("data", JSON.stringify(todos)); 
  const handleAddTodo = (evt) => {
    if (evt.keyCode === 13) {
      const newTodo = {
        id: todos.at(-1) ? todos.at(-1).id + 1 : 1,
        value: evt.target.value,
        isComplated: false,
      };
      setTodo([...todos, newTodo]);
      evt.target.value = null;
    }
  };
  return (
    <div className = "container">
       <h2 className = "heading">To do list</h2>
      <input className = "writeInput" type="text" placeholder = "write list element" onKeyUp={handleAddTodo} required />
      {
        todos?.length > 0 &&
         (
          <ul className = "toDoList">
            {
              todos.map((todo) => (
                <li className = "toDoItem" key={todo.id}>
                  <input className = "checkboxInput" type="checkbox"  onChange = { () => {
                      todo.isComplated = !todo.isComplated;
                      setTodo([...todos]);
                  }
                  } checked = {todo.isComplated} />
                  <span className = {todo.isComplated? "deletelist": "staylist" } >{todo.value}</span>
                  <button onClick={ () => {
                  if (todo.isComplated) {
                    setTodo(todos.filter(
                      (item) => item.id !== todo.id
                    ))
                  }
                }
                  }>
                    &times;
                  </button>
                </li>
              )
              )
            }
          </ul>
        )
       } 
    </div>
  );
}

export default Todo;