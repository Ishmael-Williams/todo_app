import React from 'react';
import './App.css';

//Manage and render the todo list
function TodoForm({ addTodo }){
  const[value, setValue] = React.useState('');

  //event handler for input box, allows todo list to be updated
  const handleSubmit = e => {
    //prevent event's default behavior
    e.preventDefault();
    //If user submitted nothing into input box, do nothing
    if(!value) return;
    //update todo with new task using input value
    addTodo(value);
    //clear the input field after submitting the new task
    setValue('');
  }

  //render todo list as a form, allow submitting
  return(
    <form onSubmit={handleSubmit}>
      <input 
      type='text'
      classname='input'
      value={value}
      onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

//Define what a single todo component has
function Todo({ todo, index, completeTodo, removeTodo }) {
  //Todo components render a div containing the todo text,
  //and another div containing the button to complete the task
  return (
    <div 
    className='todo'
    style ={{textDecoration: todo.isCompleted ? 'line-through' : ''}}
    >
      {todo.text}
      <div>
        {/* render the completion and deletion buttons for the todo component */}
        <button onClick={() => completeTodo(index)}> ✓ </button>
        <button onClick={() => removeTodo(index)}> X </button>
      </div>
    </div>
  );
};

//Manage and render each todo element
function App() {
  /* State of the app component*/
  const [todos, setTodos] = React.useState([
    { text: "Learn about React" },
    { text: "Meet friend for lunch" },
    { text: "Build really cool todo app" }
  ]);
  
  //Mark a todo as complete
  const completeTodo = index => {
    //Copy todos into newTodos list to modify
    const newTodos = [...todos];
    //update completion status of todo at index
    newTodos[index].isCompleted = true;
    //update todos state
    setTodos(newTodos);
  }
  //Delete todos
  const removeTodo = index => {
    //Create a copy of the todo list
    const newTodos = [...todos];
    //splice out one todo from the list at the specified index
    newTodos.splice(index,1);
    //update todo list
    setTodos(newTodos);
  }

  //Apped a new todo to the todos list
  const addTodo = text =>{
    //Make new todos use spread operator and adding contents of text to it
    //Spread operator creates a COPY of all the contents in todos, todos itself is not manually updated, React will do that
    const newTodos = [...todos, { text }];

    //use setTodos hook to update todos state
    setTodos(newTodos);

  };
  

  
  /*Rendering the app component */
  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) =>(<Todo 
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          />
          ))}
        <TodoForm addTodo={addTodo}/>
      </div>
    </div>
  );
}

export default App;