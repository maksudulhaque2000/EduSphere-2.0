import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses";
import TeachOn from "../Pages/TeachOn/TeachOn";
import SignIn from "../Pages/auth/SignIn";
import SignUp from "../Pages/auth/SignUp";
import Dashboard from "../Layout/Dashboard/Dashboard";
import TeacherRequest from "../Layout/Dashboard/Admin/TeacherRequest";
import AllClassesList from "../Layout/Dashboard/Admin/AllClassesList";
import AdminProfile from "../Layout/Dashboard/Admin/AdminProfile";
import MyEnrollClasses from "../Layout/Dashboard/Student/MyEnrollClasses";
import PrivateRouter from "./PrivateRouter";
import AllUsers from "../Layout/Dashboard/Admin/AllUsers";
import AddClass from "../Layout/Dashboard/Teacher/AddClass";
import MyClass from "../Layout/Dashboard/Teacher/MyClass";
import UpdateClass from "../components/UpdateClass";
import Details from "../components/Details";
import DetailsPublic from "../components/DetailsPublic";
import Payment from "../components/Payment/Payment";
import MyEnrollClassDetails from "../Layout/Dashboard/Student/MyEnrollClassDetails";
import Error from "../Pages/Shared/Error/Error";
import DefaultDashboard from "../Layout/Dashboard/DefaultDashboard";
import AdminRouter from "./AdminRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allclasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/allclasses/:id",
        element: (
          <PrivateRouter>
            <DetailsPublic></DetailsPublic>
          </PrivateRouter>
        ),
      },
      {
        path: "/teachon",
        element: (
          <PrivateRouter>
            <TeachOn></TeachOn>
          </PrivateRouter>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRouter>
            <Payment></Payment>
          </PrivateRouter>
        ),
      },
      {
        path: "/auth/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/auth/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <DefaultDashboard></DefaultDashboard>
          </PrivateRouter>
        ),
      },
      // Admin
      {
        path: "/dashboard/teacherrequest",
        element: (
          <AdminRouter>
            <TeacherRequest></TeacherRequest>
          </AdminRouter>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRouter>
            <AllUsers></AllUsers>
          </AdminRouter>
        ),
      },
      {
        path: "/dashboard/allclasseslist",
        element: (
          <AdminRouter>
            <AllClassesList></AllClassesList>
          </AdminRouter>
        ),
      },
      {
        path: "/dashboard/adminprofile",
        element: (
          <PrivateRouter>
            <AdminProfile></AdminProfile>
          </PrivateRouter>
        ),
      },
      // Teacher
      {
        path: "/dashboard/addclass",
        element: (
          <PrivateRouter>
            <AddClass></AddClass>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myclass",
        element: (
          <PrivateRouter>
            <MyClass></MyClass>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myclassdetails/:id",
        element: (
          <PrivateRouter>
            <Details></Details>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myclass/:id",
        element: (
          <PrivateRouter>
            <UpdateClass></UpdateClass>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/teacherprofile",
        element: (
          <PrivateRouter>
            <AdminProfile></AdminProfile>
          </PrivateRouter>
        ),
      },
      // Student
      {
        path: "/dashboard/myenrollclass",
        element: (
          <PrivateRouter>
            <MyEnrollClasses></MyEnrollClasses>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myenrollclass/:id",
        element: (
          <PrivateRouter>
            <MyEnrollClassDetails></MyEnrollClassDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/studentprofile",
        element: (
          <PrivateRouter>
            <AdminProfile></AdminProfile>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
