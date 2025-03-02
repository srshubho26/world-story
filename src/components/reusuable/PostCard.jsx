import PropTypes from 'prop-types';
import CatMapper from '../CatMapper/CatMapper';
import formatDate from '../../assets/utilities/dateTimeFormatter';
import { Link } from 'react-router-dom';

const PostCard = ({ post, isAll=false }) => {
    const { id, title, thumbnail, category, posted_on } = post;
    return (
        <div className={'bg-white dark:bg-sec_title w-full mx-auto sm:m-0 flex flex-col rounded-md overflow-hidden ' + (isAll ? 'h-full' : '')}>
            <img className='aspect-[3/2] w-full object-cover' src={thumbnail} alt={title} />

            <div className='p-5 flex flex-col grow'>
                <h4 className='font-bold text-post_title dark:text-secondary text-base lg:text-xl mb-3 grow hover:text-prime dark:hover:text-prime'>
                    <Link to={`/view/${id}`}>{title}</Link>
                </h4>

                <div className='lg:flex flex-wrap gap-2 justify-between items-center'>
                    <span className='text-sec_title dark:text-white font-semibold text-sm lg:text-base uppercase block mb-2 lg:m-0'>{formatDate(posted_on)}</span>

                    <CatMapper ids={{ ...category }} />
                </div>
            </div>
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.object,
    isAll: PropTypes.bool
};

export default PostCard;