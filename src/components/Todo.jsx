import React, { useReducer } from 'react';
import produce from 'immer';

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
    case 'TOGGLE_DARK_MODE':
      return produce(state, (draft) => {
        draft.darkMode = !draft.darkMode;
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
    darkMode: false,
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

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <div
      style={{
        background: state.darkMode ? '#333' : '#fff',
        color: state.darkMode ? '#fff' : '#333',
        padding: '20px',
        borderRadius: '5px',
      }}
    >
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
      <div>
        <button onClick={toggleDarkMode}>
          {state.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Todo;