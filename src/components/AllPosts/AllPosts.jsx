import { useContext, useEffect } from 'react';
import Title from '../Title/Title';
import { PostContext } from '../../providers/PostProvider';
import Post from '../Home/homeParts/LatestPosts/Post';
import LoadMore from '../LoadMore/LoadMore';

const AllPosts = () => {
    const { allPosts, setIsAllPost, allPostLoading, shouldShowMore, setPostStart } = useContext(PostContext);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        setIsAllPost(true);
    }, [setIsAllPost])

    return (<section className='max-w-screen-xl mx-auto py-16 px-2 xl:px-0'>
        <Title title="all posts" />

        <div className='-mt-12 md:m-0'>
            {allPosts && allPosts.map(post => <Post key={post.id} post={post} />)}
        </div>

        {allPostLoading ? <div className='mt-10 mb-1 flex justify-center items-center'>
            <span className="loading text-prime loading-spinner loading-lg"></span>
        </div> : shouldShowMore && <LoadMore loadMore={setPostStart}/>}
    </section>);
};

export default AllPosts;