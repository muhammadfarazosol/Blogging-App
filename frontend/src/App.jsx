import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./auth/Login";
// import SignUp from "./auth/SignUp";
import MainLayout from "./layout/MainLayout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import Blogs from "./pages/Blogs";
import Auth from "./auth/Auth";
import PostDetail from "./pages/PostDetail";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout";
import DeletePost from "./pages/DeletePost";
import UserProvider from "./context/userContext.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserProvider>
          <MainLayout />
        </UserProvider>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
        // {
        //   path: "signin",
        //   element: <Login />,
        // },
        // {
        //   path: "signup",
        //   element: <SignUp />,
        // },
        {
          path: "authors",
          element: <Authors />,
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "posts/:id",
          element: <PostDetail />,
        },
        {
          path: "profile/:id",
          element: <UserProfile />,
        },
        {
          path: "create",
          element: <CreatePost />,
        },
        {
          path: "posts/categories/:category",
          element: <CategoryPosts />,
        },
        {
          path: "posts/users/:id",
          element: <AuthorPosts />,
        },
        {
          path: "myposts/:id",
          element: <Dashboard />,
        },
        {
          path: "posts/:id/edit",
          element: <EditPost />,
        },
        {
          path: "posts/:id/delete",
          element: <DeletePost />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
