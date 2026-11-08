import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaToggleOn } from 'react-icons/fa';
import { BiSolidToggleLeft } from 'react-icons/bi';
import { BsDatabaseFillUp } from "react-icons/bs";
import axios from 'axios';
const TodoForm = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) {
      alert("Please fill the field");
      return;
    }
 
    if (editId) {
      setTodos(todos.map(todo => 
        todo.id === editId ? { ...todo, text: input } : todo
      ));
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false // New property to track completion
      };
      setTodos([...todos, newTodo]);
    }
    setInput('');
  };
    //  Data store in input state
  const handleChange = (event) => {
    setInput(event.target.value);
  };
// Remove Data 
  const handleRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
// Edit Data
  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setInput(todoToEdit.text);
    setEditId(id);
  };
// Complete or Undo Task
  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
// save Data into Database 
const handleSave = (id) => {
    const todoToSave = todos.find(todo => todo.id === id);
  
    axios.post('/storedata', todoToSave)
      .then(res => {
        console.log(res);
        alert(`Data Added Successfully`);
      })
      .catch(err => console.log(err));
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form-control"
          placeholder="Add a todo"
          name="InputField"
          value={input}
          onChange={handleChange} 
          autoFocus 
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>
      
      {todos.length > 0 && (
        <div className="App">
          <table>
            <thead>
              <tr>
                <th>Todo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  <td>{todo.text}</td>
                 
                  <td>
                    <MdDelete style={{ color: 'red' }} onClick={() => handleRemove(todo.id)} title='Remove' />
                    <MdEdit style={{ marginLeft: '10px' }} onClick={() => handleEdit(todo.id)} title='Edit' />
                    {todo.completed ? (
                      <BiSolidToggleLeft style={{ marginLeft: '10px' }} onClick={() => handleToggle(todo.id)} title='undo'/>
                    ) : (
                      <FaToggleOn style={{ marginLeft: '10px' }} onClick={() => handleToggle(todo.id)} title='Complete'/>
                    )}
                    <BsDatabaseFillUp style={{ marginLeft: '10px' }} onClick={() => handleSave(todo.id)} title='save into Database' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
