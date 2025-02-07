import PropTypes from 'prop-types';
import CatMapper from '../../../../components/CatMapper/CatMapper';
import formatDate from '../../../../assets/utilities/dateTimeFormatter';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const { id, title, thumbnail, category, posted_on } = post;
    return (
        <div className='bg-white dark:bg-sec_title w-full mx-auto sm:m-0 sm:w-[49%] md:w-[32%] max-w-80 sm:max-w-full flex flex-col rounded-md overflow-hidden'>
            <img className='h-56 lg:h-72 w-full object-cover' src={thumbnail} alt={title} />

            <div className='p-5 flex flex-col grow'>
                <h4 className='font-bold text-post_title dark:text-secondary text-base lg:text-xl mb-3 grow hover:text-prime dark:hover:text-prime'>
                    <Link to={`/view/${id}`}>{title}</Link>
                </h4>

                <div className='lg:flex justify-between items-center'>
                    <span className='text-sec_title dark:text-white font-semibold text-sm lg:text-base uppercase block mb-2 lg:m-0'>{formatDate(posted_on)}</span>

                    <CatMapper ids={{...category}} />
                </div>
            </div>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.object
};

export default Post;