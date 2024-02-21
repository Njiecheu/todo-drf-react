/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
// import React from 'react'
import axios from "axios";
import { useState } from "react";
import { MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineDeleteOutline } from "react-icons/md";

const Table = ({todos, setTodos, isLoading}) => {

  const [editText, seteditText] = useState({
    'body': ''
  })

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/${id}/`)
      const newList = todos.filter(todo => todo.id !== id)
      setTodos(newList)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/todo/${id}/`, value)
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodos)
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      'completed': !value
    })
  }

  const handleChange = (e) => {
    seteditText(prev => ({
      ...prev,
      'body':e.target.value
    }))
  }

  const handleClick = () => {
    handleEdit(editText.id, editText)
  }

  return (
    <div className='py-2 overflow-x-auto'>
      <table className='mx-auto w-full max-w-4xl'>
        <thead className='border-b-2 border-black'>
          <tr>
            <th className='p-3 text-sm font-semibold tracking-wide text-left text-black'>Checkbox</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left text-black'>To Do</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left text-black'>Status</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left text-black'>Data Created</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left text-black'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? <div>Is Loading</div> :
          <>
            {todos.map((todoItem, index) => {
              return (
                <tr key={todoItem.id} className="border-b border-black">
                  <td className='p-3' title={todoItem.id}>
                    <span className="inline-block cursor-pointer text-black" onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}>
                      {todoItem.completed ? <MdOutlineCheckBox/> : <MdOutlineCheckBoxOutlineBlank/>}
                    </span>
                  </td>
                  <td className='p-3 text-sm text-black'>{todoItem.body}</td>
                  <td className='p-3 text-sm text-justify'>
                    <span className={`p-1.5 text-xs text-black font-medium tracking-wider rounded-md ${todoItem.completed ? `bg-green-300` : `bg-red-300`}`}>{todoItem.completed ? `Complete` : `Incomplete`}</span>
                  </td>
                  <td className='p-3 text-sm text-black sm:table-cell'>{new Date(todoItem.created).toLocaleString()}</td>
                  <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5'>
                    <span className="text-xl">
                      <label htmlFor="my_modal_6" className="text-black cursor-pointer" onClick={() => seteditText(todoItem)}><MdEditNote/></label>
                    </span>
                    <span className="text-xl cursor-pointer">
                      <MdOutlineDeleteOutline className='text-black' onClick={() => handleDelete(todoItem.id)}/>
                    </span>
                  </td>
                </tr>
              )
            })
          }</>}
        </tbody>
      </table>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-indigo-100">
          <h3 className="font-bold text-lg">Edit todo</h3>
          <input type="text" placeholder="Type here" value={editText.body} onChange={handleChange} className="input input-bordered w-full mt-8 bg-white" />
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn bg-blue-600" onClick={handleClick}>
              Edit
            </label>
            <label htmlFor="my_modal_6" className="btn bg-green-600">Close</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table