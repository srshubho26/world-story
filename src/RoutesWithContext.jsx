import { useContext } from "react";
import { PostContext } from "./providers/PostProvider";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Root from './Root';
import Home from "./components/Home/Home";
import ViewPost from "./components/ViewPost/ViewPost";
import CatPost from "./components/CatPost/CatPost";
import AllPosts from "./components/AllPosts/AllPosts";
import Contact from "./components/Contact/Contact";
import Categories from "./components/Categories/Categories";

const RoutesWithContext = () => {
    const { loadSingle } = useContext(PostContext);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '/',
                    element: <Navigate to='/home'/>
                },
                {
                    path: '/home',
                    element: <Home />
                },
                {
                    path: '/all-posts',
                    element: <AllPosts/>
                },
                {
                    path: '/categories',
                    element: <Categories/>
                },{
                    path: '/contact',
                    element: <Contact/>
                },
                {
                    path: '/view/:id',
                    element: <ViewPost />,
                    loader: async ({ params }) => {
                        const data = await loadSingle(params.id);
                        return data;
                    }
                },
                {
                    path: '/category/:id',
                    element: <CatPost />
                }
            ]
        }
    ]);

    return (<RouterProvider router={router} />
    )
}

export default RoutesWithContext;
