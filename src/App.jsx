import React, { useReducer } from 'react';
import Todo from './components/Todo';

const initialState = {
  todos: [],
  newTodo: '',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) };
    case 'SET_NEW_TODO':
      return { ...state, newTodo: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

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
    <div>
      <Todo state={state} dispatch={dispatch} addTodo={addTodo} removeTodo={removeTodo} />
    </div>
  );
};

// function App() {
//   return (
//     <div>
//       <Todo />
//     </div>
//   );
// }

export default App;





