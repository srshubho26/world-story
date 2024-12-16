import Banner from './homeParts/Banner/Banner';
import { useContext, useEffect, } from 'react';
import { PostContext } from '../../providers/PostProvider';
import LatestPosts from './homeParts/LatestPosts/LatestPosts';
import Interesting from './homeParts/Interesting/Interesting';
import Recommend from './homeParts/Recommend/Recommend';

const Home = () => {
    const { posts, postLoading, bannerPosts, authorAdvPost, sidebarPost, sidebarPostLoading, setIsHome } = useContext(PostContext);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        setIsHome(true);
    }, [setIsHome]);

    return (<>
        <Banner posts={bannerPosts} loading={postLoading} />
        <section className='max-w-screen-xl lg:flex gap-10 mx-auto py-16 px-2 xl:px-0'>
            <LatestPosts posts={posts} postLoading={postLoading} />
            <Interesting posts={sidebarPost} loading={sidebarPostLoading} />
        </section>

        <Recommend posts={authorAdvPost} />
    </>);
};

export default Home;