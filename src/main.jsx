import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Root from './Root.jsx';
import Home from './components/Home/Home.jsx';
import AllPosts from './components/AllPosts/AllPosts.jsx';
import Categories from './components/Categories/Categories.jsx';
import Contact from './components/Contact/Contact.jsx';
import ViewPost from './components/ViewPost/ViewPost.jsx';
import CatPost from './components/CatPost/CatPost.jsx';

const router = createBrowserRouter([
  {
      path: '/',
      element: <Root />,
      children: [
          {
              path: '/',
              element: <Navigate to='/home' />
          },
          {
              path: '/home',
              element: <Home />
          },
          {
              path: '/all-posts',
              element: <AllPosts />
          },
          {
              path: '/categories',
              element: <Categories />
          }, {
              path: '/contact',
              element: <Contact />
          },
          {
              path: '/view/:id',
              element: <ViewPost />
          },
          {
              path: '/category/:id',
              element: <CatPost />
          }
      ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
