import React, { useState } from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import './TodoTable.scss';
import { useAppSelector } from '../../app/hooks';
import TodoRow from '../TodoRow/TodoRow';
import { Filter } from '../../types/Filter';
import cn from 'classnames';
import { filterTodos } from '../../utils/functions';

type Props = {
  onShowModal: () => void,
}

const TodoTable: React.FC<Props> = ({ onShowModal }) => {
  const { todos } = useAppSelector(state => state.todos);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const visibleTodos = filterTodos(todos, { filter });

  return (
    <div className='todotable'>
      <Table striped bordered hover className='todotable__list'>
        <thead>
          <tr>
            <th>Title</th>
            <th className='todotable--fullwidth'>Task</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <th colSpan={4} className='todotable__empty-placeholder'>There is no todos yet...</th>
            </tr>
          ) : (
            visibleTodos.map(todo => (
              <TodoRow 
                key={todo.id}
                todo={todo}
                onShowModal={onShowModal}
              />
            ))
          )}
        </tbody>
      </Table>

      <div className='todotable__footer'>
        <ButtonGroup aria-label="Basic example">
          <Button 
            variant="secondary"
            className={cn({
              'todotable__filter--active': filter === Filter.all
            })}
            onClick={() => setFilter(Filter.all)}
          >
            All
          </Button>

          <Button 
            variant="secondary"
            className={cn({
              'todotable__filter--active': filter === Filter.completed
            })}
            onClick={() => setFilter(Filter.completed)}
          >
            Completed
          </Button>

          <Button 
            variant="secondary"
            className={cn({
              'todotable__filter--active': filter === Filter.active
            })}
            onClick={() => setFilter(Filter.active)}
          >
            Active
          </Button>
        </ButtonGroup>

        <Button variant="primary" onClick={onShowModal}>Add Todo</Button>
      </div>
    </div>
  )
}

export default TodoTable