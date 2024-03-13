import { useState } from "react"
import { ACTIONS } from "./TodoList"

function TodoComponent({ todo, dispatch }) {
    const [isChecked, setIsChecked] = useState(todo.complete)
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.name)

    const handleCheckboxChange = () => {
        dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id: todo.id } })
        setIsChecked(!isChecked)
    }
    
    const handleDelete = () => {
        dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        dispatch({type: ACTIONS.UPDATE_TODO, payload: { id: todo.id, name: editText }})
        setIsEditing(false)
    }
    
    return (
    <div className="todos">
        {!isEditing ? (
        <div style={{ color: isChecked ? "rgb(7, 245, 7)" : "#fff" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {todo.name}
          <button className="todosbtn" onClick={handleEdit}>
            Edit
          </button>
          <button className="todosbtn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => {
                console.log("Input changed:", e.target.value)
                setEditText(e.target.value)}}
          />
          <button className="todosbtn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}   
    </div>
  )
}

export default TodoComponent