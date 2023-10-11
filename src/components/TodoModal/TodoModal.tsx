import React, { useState } from 'react';
import { Button, Modal, Form, Row } from 'react-bootstrap';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as todosActions from '../../features/todos/todosSlice';

type Props = {
  onCloseModal: () => void,
}

const TodoModal: React.FC<Props> = ({ onCloseModal }) => {
  const todoToUpdate = useAppSelector(state => state.todos.todoToEdit);

  const [title, setTitle] = useState(todoToUpdate?.title || '');
  const [isTitleError, setIsTitleError] = useState(false);

  const [task, setTask] = useState(todoToUpdate?.task || '');

  const [status, setStatus] = useState<Status>(todoToUpdate?.status || Status.ACTIVE);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const normalizedTitle = title.trim();
    
    if (!normalizedTitle) {
      setIsTitleError(prevState => true);
      return;
    }

    if (todoToUpdate) {
      dispatch(todosActions.update({
        id: todoToUpdate.id,
        title,
        task: task.trim(),
        status,
      }));
    } else {
      dispatch(todosActions.add({
        title,
        task: task.trim(),
        status,
      }));
    }
    onCloseModal();
  }

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleError(prevState => false);
    setTitle(e.currentTarget.value);
  }

  return (
    <Modal show={true} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={isTitleError}>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder='Write a title for task'
                value={title}
                onChange={handleTaskChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Title is invalid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="task"
                placeholder='Write your task here...'
                value={task}
                onChange={(e) => setTask(e.currentTarget.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Select 
                aria-label="Default select example" 
                value={status}
                onChange={e => setStatus(e.currentTarget.value as Status)}
              >
                <option value={Status.COMPLETED}>Completed</option>
                <option value={Status.ACTIVE}>Active</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TodoModal;