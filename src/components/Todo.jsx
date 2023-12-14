import React, { useReducer } from 'react';
import {produce} from 'immer';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return produce(state, (draft) => {
        draft.todos.push(action.payload);
      });
    case 'REMOVE_TODO':
      return produce(state, (draft) => {
        draft.todos.splice(action.payload, 1);
      });
    case 'SET_NEW_TODO':
      return produce(state, (draft) => {
        draft.newTodo = action.payload;
      });
    default:
      return state;
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    newTodo: '',
  });

  const addTodo = () => {
    if (state.newTodo.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: state.newTodo });
      dispatch({ type: 'SET_NEW_TODO', payload: '' });
    }
  };

  const removeTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO', payload: index });
  };

  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={state.newTodo}
          onChange={(e) =>
            dispatch({ type: 'SET_NEW_TODO', payload: e.target.value })
          }
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;