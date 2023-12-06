export const getTodos = (payload) => {
  return { type: "GET_TODOS", payload }
};

export const addToDo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: {
      todo: todo,
    },
  };
};
export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};

export const readTodo = (id) => {
  return {
    type: "MARK_AS_READ",
    id,
  };
};
export const editTodo = (newData) => {
  const { title, description, id } = newData;
  return {
    type: "EDIT_TODO",
    payload: {
      title: title,
      description: description,
      index: id,
    },
  };
};
