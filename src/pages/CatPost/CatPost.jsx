import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import Title from "../../components/reusuable/Title";
import PostCard from "../../components/reusuable/PostCard";
import { Helmet } from "react-helmet-async";

const CatPost = () => {
    const { categories, catPostLoading, catPosts, setCatId } = useContext(PostContext);
    const [catName, setCatName] = useState('Unknown');
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [id]);

    useEffect(() => {
        setCatId(id);
    }, [setCatId, id]);

    useEffect(() => {
        if (!categories) return;
        const getCat = categories.find(cat => cat.id === parseInt(id));
        getCat && setCatName(getCat.name);
    }, [categories, id])


    return (<section className="max-w-screen-xl mx-auto py-20 px-2 xl:px-0">
        <Helmet>
            <title>{`Posts For '${catName}' Category`} - World Story</title>
        </Helmet>

        {catPostLoading ? <div className='justify-center h-96 flex items-center'>
            <span className="loading loading-spinner text-prime loading-lg"></span>
        </div> : catPosts && catPosts.length && <>
            <Title title={`Posts For '${catName}' Category`} />
            <div className="max-w-md mx-auto sm:max-w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {catPosts.map(post => <div key={post.id} className="border rounded-md">
                    <PostCard post={post} isAll={true} />
                </div>)}
            </div>
        </>}
        {!catPosts && !catPostLoading ? <h2 className="text-center my-28 text-4xl text-desc">No post available in this &lsquo;{catName}&rsquo; cateogry!</h2> : null}
    </section>);
};

export default CatPost;