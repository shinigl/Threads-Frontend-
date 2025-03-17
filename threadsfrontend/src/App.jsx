import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';
import Header from './components/Header';

const App = () => {
  const routes = createBrowserRouter([
     {
       path: "/",
       element:<Home/>
     },
     {
      path:"/:username",
      element: <UserPage/>
     },
     {
      path: "/:username/post/:pid",
      element: <PostPage/>
     }
    
  ])
  return (
    <>
      <Header/>
      <RouterProvider router={routes}></RouterProvider>
      </>
  );
};

export default App;
