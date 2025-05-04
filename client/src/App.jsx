import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EditTodo from "./pages/EditTodo";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import FrontPage from "./pages/FrontPage";
import NotFound from "./pages/NotFound";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />, // ⬅️ Default root shows FrontPage
  },
  {
    path: "/home",
    element: <Layout />, // ⬅️ Protected layout starts here
    children: [
      { path: "", element: <Home /> }, // ➜ /app
      { path: "todo/edit/:id", element: <EditTodo /> }, // ➜ /app/todo/edit/:id
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
  {
    path: "*",
    element:<NotFound/>
  }
]);


function App() {
  

  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
