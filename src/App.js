import TodoForm from "./components/TodoForm";
import { Routes, Route } from "react-router-dom";
import ShowTodos from "./components/ShowTodos";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoForm/>}></Route>
        <Route path="/showtodos" element={<ShowTodos/>}></Route>
      </Routes>
    </>
  );
};

export default App;