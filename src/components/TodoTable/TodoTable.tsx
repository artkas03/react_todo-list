import React from 'react';
import { Table, Button } from 'react-bootstrap';
import './TodoTable.scss';
import { useAppSelector } from '../../app/hooks';
import TodoRow from '../TodoRow/TodoRow';

type Props = {
  onShowModal: () => void,
}

const TodoTable: React.FC<Props> = ({ onShowModal }) => {
  const { todos } = useAppSelector(state => state.todos);

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
              <th colSpan={3} className='todotable__empty-placeholder'>There is no todos yet...</th>
            </tr>
          ) : (
            todos.map(todo => (
              <TodoRow key={todo.id} todo={todo} />
            ))
          )}
        </tbody>
      </Table>

      <div className='todotable__footer'>
        <Button variant="primary" onClick={onShowModal}>Add Todo</Button>
      </div>
    </div>
  )
}

export default TodoTable