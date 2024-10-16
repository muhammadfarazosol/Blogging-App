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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
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
          index: "posts/:id",
          element: <PostDetail />,
        },
        {
          index: "profile/:id",
          element: <UserProfile />,
        },
        {
          index: "create",
          element: <CreatePost />,
        },
        {
          index: "posts/categories/:category",
          element: <CategoryPosts />,
        },
        {
          index: "posts/user/:id",
          element: <AuthorPosts />,
        },
        {
          index: "myposts/:id",
          element: <Dashboard />,
        },
        {
          index: "posts/:id/edit",
          element: <EditPost />,
        },
        {
          index: "logout",
          element: <Logout />,
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
