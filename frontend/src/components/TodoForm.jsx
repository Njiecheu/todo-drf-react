/* eslint-disable react/prop-types */
// import React from 'react'

import axios from "axios"
import { useState } from "react"

// eslint-disable-next-line no-unused-vars
const TodoForm = ({setTodos, fetchData}) => {
  const [newTodo, setnewTodo] = useState({
    'body':''
  })

  const handleChange = (e) => {
    setnewTodo(prev => ({
      ...prev,
      'body':e.target.value
    }))
    console.log(newTodo);
  }

  const postTodo = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/todo/', newTodo)
      // setTodos(prevTodos => [...prevTodos,newTodo])
      setnewTodo({'body':''})
      fetchData()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Add Todo"
        className="input input-bordered input-info w-full max-w-xs bg-white"
        onChange={handleChange}
        value={newTodo.body}/>
      <button
        className="btn btn-primary ml-5 text-white"
        onClick={postTodo}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            postTodo()
          }
        }}>Add</button>
    </div>
  )
}

export default TodoForm