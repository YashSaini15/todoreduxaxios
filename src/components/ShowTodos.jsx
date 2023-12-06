import React, { useEffect } from "react";
import { useState } from "react";
import { Table, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  requestDeleteTodo,
  requestEditTodo,
  requestForTodo,
  requestReadTodo
} from "../thunk/requests";

const ShowTodos = () => {
  const list = useSelector((state) => state.todoReducer.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestForTodo());
  },[dispatch]);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    editedIndex: null,
    showEditModal: false
  });

  const handleEditTodo = (index) => {
    const foundTodo = list.find((todo) => todo.id === index);
    if (foundTodo) {
      const { title, description } = foundTodo;
      setEditForm({
        ...editForm,
        showEditModal: true,
        title: title,
        description: description,
        editedIndex: index
      });
    }
  };

  const handleCloseEditModal = () => {
    setEditForm({
      ...editForm,
      showEditModal: false,
    });
  };

  const handleEditInputChange = (id, value) => {
    setEditForm({
      ...editForm,
      [id]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { title, description, editedIndex } = editForm;
    const newData = {
      title: title,
      description: description,
      id: editedIndex,
    };
    dispatch(requestEditTodo(newData.id, newData));
    handleCloseEditModal();
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Todo List</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Todo Title</th>
                <th>Todo Description</th>
                <th>Manage Todo</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button
                      variant="danger"
                      style={{ marginRight: "10px" }}
                      onClick={() => dispatch(requestDeleteTodo(item.id))}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleEditTodo(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="info"
                      style={{
                        backgroundColor: item.isRead && "green",
                      }}
                      onClick={() => dispatch(requestReadTodo(item.id))}
                    >
                      {item?.isRead ? "Completed" : "Mark as Read"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={editForm.showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={editForm.title || ""}
                    onChange={(e) => {
                      handleEditInputChange(e.target.name, e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="textarea"
                    name="description"
                    value={editForm.description || ""}
                    onChange={(e) =>
                      handleEditInputChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <br />
                <Button
                  variant="danger"
                  onClick={() => handleCloseEditModal()}
                  style={{ marginTop: "10px" }}
                >
                  Close
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default ShowTodos;