import React from 'react';
import '../App.css';

const App = () => {
  // hooks
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState('');
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState('');

  React.useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, [])

  React.useEffect(() => {
    // stringify converts any js into json
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos])

  const addTodo = (e) => {
    // To prevent the refresh of the web page
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }
    // creating the new array with the spread operator to clone todos variable without mutate the original data
    setTodos([...todos].concat(newTodo));
    // to reset the input and make it blank
    setTodo("");
  }

  const deleteTodo = (id) => {
    // the condition is going to be true for every to do except the one we are deleting
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const completeTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    })
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list" className="App">
      <h1>Todo List</h1>

      <form onSubmit={addTodo}>
        <input type="text" onChange={(e) => { setTodo(e.target.value) }} value={todo} />
        <button type="submit" >Add Task</button>
      </form>

      {todos.map((todo) =>
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              onChange={() => completeTodo(todo.id)}
              checked={todo.completed} />

            {todoEditing === todo.id ?
              (<input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText} />) :
              (<div>{todo.text}</div>)}
          </div>

          <div className="todo-actions">
            {todoEditing === todo.id ?
              (<button onClick={() => editTodo(todo.id)} >Submit edit</button>) :
              (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
            <button onClick={() => { deleteTodo(todo.id) }}>Delete</button>
          </div>

        </div>)}
    </div>
  );
}

export default App;
