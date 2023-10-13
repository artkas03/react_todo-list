import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/Todo";

type TodosState = {
  todos: Todo[],
  todoToEdit: Todo | null,
}

const initialTodosJSON: string | null = localStorage.getItem('todos');

const initialState: TodosState = {
  todos: initialTodosJSON ? JSON.parse(initialTodosJSON) : [],
  todoToEdit: null,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Omit<Todo, 'id'>>) {
      const newId = state.todos.length > 0 
        ? Math.max(...state.todos.map(todo => todo.id)) + 1
        : 1;

      state.todos.push({ ...action.payload, id: newId });
      localStorage.setItem(todosSlice.name, JSON.stringify(state.todos));
    },
    setTodoToEdit(state, action: PayloadAction<Todo | null>) {
      state.todoToEdit = action.payload;
    },
    update(state, action: PayloadAction<Todo>) {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...action.payload };
        }

        return todo;
      })

      state.todoToEdit = null;
      localStorage.setItem(todosSlice.name, JSON.stringify(state.todos));
    },
    remove(state, action: PayloadAction<Number>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem(todosSlice.name, JSON.stringify(state.todos));
    }
  },
});

export const todosReducer = todosSlice.reducer;
export const { add, update, setTodoToEdit, remove } = todosSlice.actions;