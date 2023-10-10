import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/Todo";

type AuthorState = {
  todos: Todo[],
}

const initialState: AuthorState = {
  todos: [],
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
    },
    update(state, action: PayloadAction<Todo>) {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      })
    },
    remove(state, action: PayloadAction<Number>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  },
});

export const todosReducer = todosSlice.reducer;
export const { add, update, remove } = todosSlice.actions;