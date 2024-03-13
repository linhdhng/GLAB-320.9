import { useState, useReducer } from "react";
import TodoComponent from "./TodoComponent";

export const ACTIONS = {
    ADD_TODO:'add_todo',
    UPDATE_TODO:'update_todo',
    DELETE_TODO:'delete_todo'
}

function reducer(todos, action){

  switch(action.type){

    case ACTIONS.ADD_TODO:
      return[...todos, newTodo(action.payload.name)]
      
    case ACTIONS.UPDATE_TODO:
      return todos.map((e)=>{
        if(e.id === action.payload.id){
          return{...e, complete: !e.complete}
        }
        
        return e
      })

    case ACTIONS.DELETE_TODO:
      return todos.filter((e)=> e.id !== action.payload.id)   
          
    default:
      return todos    
  }
}

function newTodo(name) {
  return{
    id:Date.now(),
    name: name,
    complete: false
  }
}

function Todo() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('')

  function handleSubmit(e){
        e.preventDefault()
        dispatch({type:ACTIONS.ADD_TODO, payload:{name:name}})
        setName('')    
  }

  return (
    <div>
      <div  className="todosform">
          <h2>My Todo List</h2>
          <div className="todos">
            <form className="todoform" onSubmit={handleSubmit} >
              <input value={name} placeholder="Add Task" onChange={e => setName(e.target.value)} />
              <button className='todosbtn' onClick={handleSubmit}>ADD</button>
            </form>
          </div>

          <div>
            {todos.slice(0).reverse().map(todo =>{
              return <TodoComponent key={todo.id} todo={todo} dispatch={dispatch} /> 
            })}
          </div>
      </div>
    </div>
  )
}

export default Todo