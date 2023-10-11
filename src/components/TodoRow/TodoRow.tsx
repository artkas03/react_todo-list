import React from 'react'
import { Todo } from '../../types/Todo'
import './TodoRow.scss';
import cn from 'classnames';
import { Status } from '../../types/Status';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import * as todosActions from '../../features/todos/todosSlice';
import { Image } from 'react-bootstrap';

import editIcon from '../../assets/icons/edit-icon.svg';
import deleteIcon from '../../assets/icons/red-delete.svg';

type Props = {
  todo: Todo,
  onShowModal: () => void,
}

const TodoRow: React.FC<Props> = ({ todo, onShowModal }) => {
  const { title, task, status } = todo;

  const dispatch = useAppDispatch();

  const handleOnChageStatus = (newStatus: Status) => {
    dispatch(todosActions.update({ ...todo, status: newStatus }));
  }

  const handleOnEdit = () => {
    dispatch(todosActions.setTodoToEdit(todo));
    onShowModal();
  }
  
  const handleOnDelete = () => {
    dispatch(todosActions.remove(todo.id));
  }

  return (
    <tr className='todo-row'>
      <th className='todo-row__cell'>{title}</th>
      <th className='todo-row__cell'>{task}</th>
      <th 
        className={cn('todo-row__cell', 'todo-row--centered')}
      >
        <Form.Select 
          aria-label="Default select example" 
          value={status}
          onChange={(e) => handleOnChageStatus(e.currentTarget.value as Status)}
          className={cn('todo-row--contentfit', {
            'todo-row__status-completed': status === Status.COMPLETED,
            'todo-row__status-active': status === Status.ACTIVE,
          })}
        >
          <option value={Status.COMPLETED} className='todo-row__option'>{Status.COMPLETED}</option>
          <option value={Status.ACTIVE} className='todo-row__option'>{Status.ACTIVE}</option>
        </Form.Select>
      </th>
      <th className='todo-row__cell todo-row--centered'>
        <div className="todo-row__icons">
          <Image 
            src={editIcon} 
            className="todo-row__icon"
            onClick={handleOnEdit}
          />
          <Image 
            src={deleteIcon} 
            className="todo-row__icon"
            onClick={handleOnDelete}
          />
        </div>
      </th>
    </tr>
  )
}

export default TodoRow