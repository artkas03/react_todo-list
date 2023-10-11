import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/Todo";

type TodoToEditState = {
  todo: Todo | null,
}

const initialState: TodoToEditState = {
  todo: null,
}

export const todoToEditSlice = createSlice({
  name: 'todoToEdit',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Todo | null>) {
      state.todo = action.payload;
    },
    update(state, action: PayloadAction<Omit<Todo, 'id'>>) {
      state.todo = { ...state.todo, ...action.payload } as Todo;
    }
  }
});

export const todoToEditReducer = todoToEditSlice.reducer;
export const { set, update } = todoToEditSlice.actions;