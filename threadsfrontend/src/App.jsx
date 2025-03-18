import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import { Provider } from 'react-redux';
import store from './redux/store';



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
     },
     {
      path: '/auth',
      element : <AuthPage/>
     }
    
  ])
  return (
      
      <>
      <Provider store={store}>
      <Header/>
      <RouterProvider router={routes}></RouterProvider>
      </Provider>

      </>
  );
};

export default App;
