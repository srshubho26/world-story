import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Root from './Root.jsx';
import Error404 from './pages/Error404/Error404.jsx';
import Home from './pages/Home/Home.jsx';
import AllPosts from './pages/AllPosts/AllPosts.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Login from './pages/Login/Login.jsx';
import ViewPost from './pages/ViewPost/ViewPost.jsx';
import CatPost from './pages/CatPost/CatPost.jsx';
import Register from './pages/Register/Register.jsx';
import PrivateRoute from './components/reusuable/PrivateRoute.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import AddPost from './pages/AddPost/AddPost.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error404 />,
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
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/view/:id',
                element: <ViewPost />
            },
            {
                path: '/category/:id',
                element: <CatPost />
            },
            {
                path: '/edit-profile',
                element: <PrivateRoute><EditProfile /></PrivateRoute>
            },
            {
                path: '/add-post',
                element: <PrivateRoute><AddPost /></PrivateRoute>
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
