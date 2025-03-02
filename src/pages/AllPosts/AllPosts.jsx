import { useContext, useEffect } from 'react';
import Title from '../../components/reusuable/Title';
import { PostContext } from '../../providers/PostProvider';
import PostCard from '../../components/reusuable/PostCard';
import { Helmet } from 'react-helmet-async';

const AllPosts = () => {
    const { allPosts } = useContext(PostContext);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    return (<section className='max-w-screen-xl mx-auto py-16 px-2 xl:px-0'>
        <Title title="all posts" />
        <Helmet>
            <title>All Posts - World Story</title>
        </Helmet>

        <div className='max-w-md mx-auto sm:max-w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {allPosts && allPosts.map(post => <div key={post.id} className='border rounded-md'>
                <PostCard post={post} isAll={true} />
            </div>)}
        </div>
    </section>);
};

export default AllPosts;