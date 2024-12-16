import PropTypes from 'prop-types';
import Title from '../../../Title/Title';
import SidebarPost from './SidebarPost';

const Interesting = ({posts, loading}) => {
    return (
        <aside className='basis-4/12 mt-20 max-w-screen-sm lg:max-w-full lg:m-0'>
            <Title title="Interesting"/>
            {
                loading ? <div className='min-h-96 flex justify-center items-center'>
                    <span className="loading loading-spinner text-prime loading-lg"></span>
                </div> : posts && posts.map(post=><SidebarPost key={post.id} post={post}/>)
            }
        </aside>
    );
};

Interesting.propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool
};

export default Interesting;