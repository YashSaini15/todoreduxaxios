import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { requestAddTodo } from "../thunk/requests";

const TodoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const [redirect, setRedirect] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    titleError: "",
    descriptionError: ""
  })
  
  const updateInput = (id, value) => {
    setForm((prevForm) => ({ ...prevForm, [id]: value}));
  };

  const validation = () => {
    const { title, description } = form;
    let hasError = false;

    if (title.trim().length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        titleError: "Please enter a title.",
      }));
      hasError = true;
    }

    if (description.trim().length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        descriptionError: "Please enter a description.",
      }));
      hasError = true;
    }
    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();

    if (isValid) {
      dispatch(requestAddTodo(form))
      setForm({
        title: "",
        description: "",
      })
      setRedirect(true)
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/showtodos");
    }
  });

  return (
    <div>
      <>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          ToDo List
        </Row>
        <Form
          className="container"
          style={{ maxWidth: "480px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              placeholder="Enter the title"
              value={form?.title}
              onChange={(e) => updateInput(e.target.id, e.target.value)}
              ref={titleRef}
            />
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errors.titleError}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              id="description"
              placeholder="Enter description"
              rows={3}
              value={form?.description}
              onChange={(e) => updateInput(e.target.id, e.target.value)}
            />
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errors.descriptionError}
            </div>
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => handleSubmit}
            style={{ padding: "6px 25px" }}
            type="submit"
          >
            Add
          </Button>
          <br />
          <Link to="/showtodos">
            <Button variant="success" style={{ marginTop: "10px" }}>
              Show Todos
            </Button>
          </Link>
        </Form>
      </>
    </div>
  );
};

export default TodoForm;