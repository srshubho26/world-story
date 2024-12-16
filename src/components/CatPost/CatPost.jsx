import { useContext, useEffect, useState } from "react";
import Post from '../Home/homeParts/LatestPosts/Post';
import { useParams } from "react-router-dom";
import Title from "../TItle/Title";
import { PostContext } from "../../providers/PostProvider";

const CatPost = () => {
    const {categories, catPostLoading, catPosts, setCatId} = useContext(PostContext);
    const [catName, setCatName] = useState('Unknown');
    const {id} = useParams();

    useEffect(()=>{
        window.scrollTo({top: 0});
    }, [id]);

    useEffect(()=>{
        setCatId(id);
    }, [setCatId, id]);

    useEffect(()=>{
        if(!categories)return;
        const getCat = categories.find(cat=>cat.id===parseInt(id));
        getCat && setCatName(getCat.name);
    }, [categories, id])


    return (<section className="max-w-screen-xl mx-auto py-20 px-2 xl:px-0">
        {catPostLoading ? <div className='justify-center h-96 flex items-center'>
                <span className="loading loading-spinner text-prime loading-lg"></span>
            </div> : catPosts && catPosts.length && <>
            <Title title={`Posts For '${catName}' Category`}/>
            {catPosts.map(post=><Post key={post.id} post={post}/>)}
        </>}
        {!catPosts && !catPostLoading ? <h2 className="text-center my-28 text-4xl text-desc">No post available in this &lsquo;{catName}&rsquo; cateogry!</h2> : null}
    </section>);
};

export default CatPost;