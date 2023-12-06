import { addToDo, deleteTodo, readTodo, editTodo } from "../actions";
import axios from "axios";
import { BASE_API_URL } from "../utils/constant";
import { getTodos } from "../actions";

export const requestForTodo = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/data`);
    dispatch(getTodos(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const requestAddTodo = (data) => (dispatch) => {
  try {
    axios.post(`${BASE_API_URL}/data`, data).then((res) => {
      const todo = res.data;
      dispatch(addToDo(todo));
    });
  } catch (err) {
    console.log(err);
  }
};

export const requestDeleteTodo = (id) => (dispatch) => {
  try {
    axios.delete(`${BASE_API_URL}/data/${id}`);
    dispatch(deleteTodo(id));
  } catch (err) {
    console.log(err);
  }
};

export const requestEditTodo = (id, data) => async (dispatch) => {
  try {
    const respose = await axios.put(`${BASE_API_URL}/data/${id}`, data);
    const updatedTodo = respose.data;
    dispatch(editTodo(updatedTodo));
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};
export const requestReadTodo = (id) => async (dispatch) => {
  console.log(id, "i am id from requests");
  try {
    await axios.patch(`${BASE_API_URL}/data/${id}`, { isRead: true });
    dispatch(readTodo(id));
  } catch (err) {
    console.log(err);
  }
};
