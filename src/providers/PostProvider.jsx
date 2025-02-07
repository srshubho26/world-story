import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { ref, query, orderByChild, onValue, limitToFirst, startAt, set, get, equalTo, push } from "firebase/database";
import { database } from "../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
export const PostContext = createContext('post-context');

const PostProvider = ({ children }) => {
    const [postLoading, setPostLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    const [allPosts, setAllPosts] = useState(null);
    const [isAllPost, setIsAllPost] = useState(false);
    const [postStart, setPostStart] = useState(0);
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
    const [shouldShowMore, setShouldShowMore] = useState(true);

    useEffect(() => {
        // const postListRef = ref(database, 'posts');
        // const newPostRef = push(postListRef);
        // set(newPostRef, {
        //     category: { 1: true, 3: true },
        //     details: "hello"
        // });
    }, []);

    //Load posts for the 'All Posts' page
    useEffect(() => {
        if (!shouldShowMore || !isAllPost) return;
        setAllPostLoading(true);
        const postRef = ref(database, 'posts/');
        const postQuery = query(postRef, orderByChild('posted_on'), startAt(postStart), limitToFirst(6));

        onValue(postQuery, snapshot => {
            let val = snapshot.val();
            if (!val) {
                setAllPostLoading(false);
                setShouldShowMore(false);
                toast.warning("All the posts are loaded!");
                return;
            }
            val = Array.isArray(val) ? val : Object.values(val);
            const getPosts = val.filter(el => el);
            setAllPosts(prev => {
                if (!prev) {
                    return getPosts;
                }
                const { id } = prev[0];
                const checkDuplicate = getPosts.find(post => post.id === id);
                if (checkDuplicate) return prev;
                return [...prev, ...getPosts];
            });
            setAllPostLoading(false);
        })
    }, [postStart, shouldShowMore, isAllPost]);


    // Load posts for a specific category
    useEffect(() => {
        if (!catId) return;
        setCatPostLoading(true);
        const postRef = ref(database, 'posts/');
        const catPostQuery = query(postRef, orderByChild('category/' + catId), equalTo(true), limitToFirst(6));

        try {
            onValue(catPostQuery, snapshot => {
                let val = snapshot.val();
                if (!val) {
                    setCatPostLoading(false);
                    toast.warning("Something went wrong!");
                    return;
                }
                val = Array.isArray(val) ? val : Object.values(val);
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
        const postQuery = query(postRef, orderByChild('posted_on'), startAt(0), limitToFirst(6));

        onValue(postQuery, snapshot => {
            let val = snapshot.val();
            if (!val) {
                toast.error("Something went wrong!");
            }
            val = Array.isArray(val) ? val : Object.values(val);
            const getPosts = val.filter(el => el).sort((a, b) => b.id - a.id);
            setPosts([...getPosts]);
            const shuffle = [...getPosts].sort(() => Math.random() - .5);
            setBannerPosts(shuffle.slice(0, 4));
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
                const val = Array.isArray(_val) ? _val : Object.values(_val);

                setSidebarPost(val.filter(el => el));
            })
        } catch (err) {
            setSidebarPostLoading(false);
            toast.error("Something went wrong! Note: "+err.message);
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
        value={{ setPostStart, postLoading, posts, bannerPosts, categories, setIsDark, catLoading, sidebarPost, sidebarPostLoading, authorAdvPost, loadSingle, setIsHome, shouldShowMore, catPostLoading, catPosts, setCatId, setIsAllPost, allPosts, allPostLoading }}
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