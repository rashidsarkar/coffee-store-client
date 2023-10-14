import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Account/Login";
import SignUp from "../Pages/Account/SignUp";
import NotFound from "../Pages/NotFound ";
import AddCoffe from "../Components/AddCoffe";
import UpdateCoffe from "../Components/UpdateCoffe";
import MyCoffe from "../Components/MyCoffe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/myCoffee",
        element: <MyCoffe></MyCoffe>,
      },
      {
        path: "/addCoffee",
        element: <AddCoffe></AddCoffe>,
      },
      {
        path: "/updateCoffee/:id",
        element: <UpdateCoffe></UpdateCoffe>,
      },
      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
export default router;
