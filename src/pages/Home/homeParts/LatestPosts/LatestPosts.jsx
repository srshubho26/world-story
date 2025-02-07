import PropTypes from 'prop-types';
import Post from './Post';
import Title from '../../../../components/reusuable/Title';

const LatestPosts = ({ posts, postLoading }) => {

    return (
        <div className='basis-8/12 mt-10 lg:m-0'>
            <Title title="Latest Posts" />

            {postLoading ? <div className='mt-10 mb-1 flex justify-center items-center'>
                <span className="loading text-prime loading-spinner loading-lg"></span>
            </div> : posts && posts.map(post => <Post key={post.id} post={post} />)}

        </div>
    );
};

LatestPosts.propTypes = {
    posts: PropTypes.array,
    postLoading: PropTypes.bool,
    loadMore: PropTypes.func,
    shouldShowMore: PropTypes.bool
};

export default LatestPosts;