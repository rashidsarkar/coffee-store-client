import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Account/Login";
import SignUp from "../Pages/Account/SignUp";
import NotFound from "../Pages/NotFound ";
import AddCoffe from "../Components/AddCoffe";

import MyCoffe from "../Components/MyCoffe";
import UpdateCoffe from "../Components/UpdateCoffe";
import Users from "../Components/Users";
import UserEditor from "../Components/UserEditor";

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
        path: "/users",
        element: <Users></Users>,
      },
      {
        path: "/updateCoffee/:id",
        element: <UpdateCoffe></UpdateCoffe>,
      },
      {
        path: "/userUpdate/:id",
        element: <UserEditor></UserEditor>,
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
