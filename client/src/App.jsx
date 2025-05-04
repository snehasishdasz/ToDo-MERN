import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EditTodo from "./pages/EditTodo";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Navbar is here
    children: [
      { path: "/", element: <Home /> },
      { path: "/todo/edit/:id", element: <EditTodo /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/todo/edit/:id",
    element: <EditTodo />,
  },
]);


function App() {
  

  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
