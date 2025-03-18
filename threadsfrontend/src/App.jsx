import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './components/Home';
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { selectUser } from './redux/userSlice';
import { ToastContainer } from 'react-toastify';
import UpdateProfilePage from './pages/UpdateProfilePage';

const AppContent = () => {
  const user = useSelector(selectUser); // User data from Redux store
    // Check localStorage if Redux has no user
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/auth" />,
    },
    {
      path: "/auth",
      element: user ? <Navigate to="/" /> : <AuthPage />,
    },
    {
      path: "/:username",
      element: user ? <UserPage /> : <Navigate to="/auth" />,
    },
    {
      path: "/:username/post/:pid",
      element: user ? <PostPage /> : <Navigate to="/auth" />,
    },
    {
      path : "/update",
      element: user? <UpdateProfilePage/>: <Navigate to="/auth" />,
    }
  ]);

  return <RouterProvider router={routes} />;
};

const App = () => {
  return (
    <Provider store={store}>
    <AppContent />
    <ToastContainer/>
    </Provider>
  );
};

export default App;