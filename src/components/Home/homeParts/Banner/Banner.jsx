import PropTypes from 'prop-types';
import BannerLargePost from './BannerLargePost';
import BannerSmallPost from './BannerSmallPost';

const Banner = ({posts, loading}) => {
    const [bigPost, ...smallPosts] = posts || [];

    return (
        <section className='bg-banner_bg dark:bg-[#171717] min-h-96 flex justify-center items-center pt-10'>
            {loading ? <span className="loading loading-spinner text-prime loading-lg"></span>
            :
            <div className='lg:flex max-w-screen-xl lg:max-h-[calc(100vh-150px)] mx-auto'>
                <div className='basis-2/3'>
                    <BannerLargePost post={bigPost} />
                </div>

                <div className='basis-1/3 h-full max-h-screen lg:max-h-[calc(100vh-150px)] grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3'>
                    {smallPosts && smallPosts.map(post=><BannerSmallPost key={post.id} post={post}/>)}
                </div>
            </div>}
        </section>
    );
};

Banner.propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool
};

export default Banner;