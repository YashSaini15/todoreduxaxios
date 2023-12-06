const initialState = {
  list: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        list: action.payload,
      };

    case "ADD_TODO":
      const { todo } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            data: todo,
          },
        ],
      };

    case "DELETE_TODO":
      const newList = state.list.filter((item) => item.id !== action.id);
      return {
        ...state,
        list: newList,
      };

    case "MARK_AS_READ":
      const markedList = state.list.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            isRead: !item.isRead,
          };
        }
        return item;
      });
      return {
        ...state,
        list: markedList,
      };

    case "EDIT_TODO":
      const { title, description, index } = action.payload;
      const updatedList = state.list.map((item) => {
        if (item.id === index) {
          return {
            ...item,
            data: {
              title: title,
              description: description,
            },
          };
        }
        return item;
      });
      return {
        ...state,
        list: updatedList,
      };
    default:
      return state;
  }
};

export default todoReducer;