import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { ref, query, orderByChild, onValue, limitToFirst, startAt, set, get, equalTo, push, limitToLast, update, remove } from "firebase/database";
import { database } from "../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
export const PostContext = createContext('post-context');

const PostProvider = ({ children }) => {
    const [postLoading, setPostLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    const [allPosts, setAllPosts] = useState(null);
    const [allPostLoading, setAllPostLoading] = useState(true);
    const [isHome, setIsHome] = useState(false);
    const [bannerPosts, setBannerPosts] = useState(null);
    const [sidebarPost, setSidebarPost] = useState(null);
    const [authorAdvPost, setAuthorAdvPost] = useState(null);
    const [sidebarPostLoading, setSidebarPostLoading] = useState(true);
    const [catPosts, setCatPosts] = useState(null);
    const [catPostLoading, setCatPostLoading] = useState(true);
    const [catLoading, setCatLoading] = useState(true);
    const [categories, setCategories] = useState(null);
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDark')) || false);
    const [catId, setCatId] = useState(null);

    // add new post
    const addPost = async payload => {
        const postListRef = ref(database, 'posts');
        const newPostRef = push(postListRef);
        const res = await set(newPostRef, payload);
        return res;
    }

    // update a specific post
    const updatePost = async(payload, id)=>{
        const postListRef = ref(database, `posts/${id}`);
        const res = await update(postListRef, payload);
        return res;
    }

    // delete a specific post
    const deletePost = async id=>{
        const postListRef = ref(database, `posts/${id}`);
        const res = await remove(postListRef);
        return res;
    }

    //Load posts for the 'All Posts' page
    useEffect(() => {
        setAllPostLoading(true);
        const postRef = ref(database, 'posts/');
        const postQuery = query(postRef);

        onValue(postQuery, snapshot => {
            let val = snapshot.val();
            if (!val) {
                setAllPostLoading(false);
                toast.warning("Something went wrong!");
                return;
            }
            val = Array.isArray(val) ? val : Object.values(val);
            const keys = Object.keys(snapshot.exportVal());

            val = val.map((el, i) => ({ ...el, id: keys[i] })).sort((a, b) => (b.posted_on - a.posted_on));
            setAllPosts(val);

            setAllPostLoading(false);
        })
    }, []);

    // Load posts of logged in user
    const loadUserPosts = async (uid) => {
        const postRef = ref(database, 'posts/');
        const postQuery = query(postRef, orderByChild('posted_by'), equalTo(uid));

        const snapshot = await get(postQuery);
        let val = snapshot.val();
        if(!val)return [];
        val = Array.isArray(val) ? val.filter(el=>el) : Object.values(val);
        const keys = Object.keys(snapshot.exportVal());

        return val.map((el, i) => ({ ...el, id: keys[i] })).sort((a, b) => (b.posted_on - a.posted_on));
    }

    // Load posts for a specific category
    useEffect(() => {
        if (!catId) return;
        setCatPostLoading(true);
        const postRef = ref(database, 'posts/');
        const catPostQuery = query(postRef, orderByChild('category/' + catId), equalTo(true));

        try {
            onValue(catPostQuery, snapshot => {
                let val = snapshot.val();
                if (!val) {
                    setCatPostLoading(false);
                    toast.warning("Something went wrong!");
                    return;
                }
                val = Array.isArray(val) ? val : Object.values(val);
                const keys = Object.keys(snapshot.exportVal());

                val = val.map((el, i) => ({ ...el, id: keys[i] })).sort((a, b) => (b.posted_on - a.posted_on))

                const getPosts = val.filter(el => el);
                setCatPosts(getPosts);
                setCatPostLoading(false);
            })
        } catch (err) {
            setCatPostLoading(false);
            console.log(err.message);
            toast.error("Something went wrong! Please check your internet connection and reload the page.");
        }
    }, [catId]);

    // Load posts for Latest Post section
    useEffect(() => {
        if (!isHome) return;
        setPostLoading(true);
        const postRef = ref(database, 'posts/');
        const postQuery = query(postRef, orderByChild('posted_on'), limitToLast(9));

        onValue(postQuery, snapshot => {
            let val = snapshot.val();
            if (!val) {
                toast.error("Something went wrong!");
            }



            val = Array.isArray(val) ? val : Object.values(val);
            const keys = Object.keys(snapshot.exportVal());

            val = val.map((el, i) => ({ ...el, id: keys[i] }));

            const getPosts = val.filter(el => el).sort((a, b) => b.posted_on - a.posted_on);
            setPosts(getPosts.slice(3));
            setBannerPosts(getPosts.slice(0, 4));
            setAuthorAdvPost([...getPosts].sort(() => Math.random() - .5).slice(0, 3));
            setPostLoading(false);

        });

    }, [isHome]);

    // Load posts shown on the sidebar and footer
    useEffect(() => {
        if (sidebarPost) return;
        setSidebarPostLoading(true);
        const postRef = ref(database, 'posts/');
        const randomStarting = Math.round(Math.random() * 5);
        const postQuery = query(postRef, orderByChild('posted_on'), startAt(randomStarting), limitToFirst(8));
        try {
            onValue(postQuery, snapshot => {
                setSidebarPostLoading(false);
                let _val = snapshot.val();
                let val = Array.isArray(_val) ? _val : Object.values(_val);

                const keys = Object.keys(snapshot.exportVal());
                val = val.map((el, i) => ({ ...el, id: keys[i] }));

                setSidebarPost(val.filter(el => el));
            })
        } catch {
            setSidebarPostLoading(false);
            toast.error("Something went wrong!");
        }
    }, [sidebarPost]);

    // Load all the categories
    useEffect(() => {
        if (categories || sidebarPostLoading) return;
        setCatLoading(true);
        const catRef = ref(database, 'categories/');
        try {
            onValue(catRef, catSnap => {
                setCategories(catSnap.val());
                setCatLoading(false);
            })
        } catch (err) {
            setCatLoading(false);
            console.log(err.message);
            toast.error("Something went wrong! Please check your internet connection and reload the page.");
        }
    }, [categories, sidebarPostLoading]);

    //Load single post
    const loadSingle = id => {
        const singleRef = ref(database, `posts/${id}`);
        return get(singleRef);
    }

    return (<PostContext.Provider
        value={{ postLoading, posts, bannerPosts, categories, setIsDark, catLoading, sidebarPost, sidebarPostLoading, authorAdvPost, loadSingle, setIsHome, catPostLoading, catPosts, setCatId, allPosts, allPostLoading, addPost, loadUserPosts, updatePost, deletePost }}
    >
        <div className={isDark ? 'dark' : ''}>
            <ToastContainer position="top-center" theme={isDark ? 'dark' : 'light'} />
            {children}
        </div>
    </PostContext.Provider>);
};

PostProvider.propTypes = {
    children: PropTypes.object
}

export default PostProvider;