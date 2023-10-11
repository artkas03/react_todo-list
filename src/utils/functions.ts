import { Filter } from "../types/Filter";
import { Status } from "../types/Status";
import { Todo } from "../types/Todo";

type FilterParams = {
  filter: Filter,
}

export const filterTodos = (todos: Todo[], { filter }: FilterParams) => {
  const todosCopy = [...todos];

  switch (filter) {
    case (Filter.active): {
      return todosCopy.filter(todo => todo.status === Status.ACTIVE);
    }

    case (Filter.completed): {
      return todosCopy.filter(todo => todo.status === Status.COMPLETED);
    }

    default:
      return todosCopy;
  }
} 