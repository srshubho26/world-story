import PropTypes from 'prop-types';
import CatMapper from '../../../../components/CatMapper/CatMapper';
import formatDate from '../../../../assets/utilities/dateTimeFormatter';
import { detailsShorter } from '../../../../assets/utilities/detailsShorter';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const { id, thumbnail, title, posted_on, details, category } = post;

    return (
        <article className='flex flex-col sm:flex-row gap-3 md:gap-10 border-b last:border-0 border-secondary py-10'>
            <img className='rounded-md w-80 object-cover' src={thumbnail} alt={title} />
            <div className='grow flex flex-col justify-between gap-5'>
                <h3 className='text-xl xl:text-3xl font-bold text-post_title dark:text-secondary uppercase'>
                    {title}
                </h3>

                <div className='flex flex-col md:flex-row flex-wrap gap-3 md:gap-x-6'>
                    <CatMapper ids={{ ...category }} />

                    <span className='text-sec_title font-semibold text-sm sm:text-base dark:text-white uppercase'>
                        {formatDate(posted_on)}
                    </span>
                </div>

                <p className='text-desc text-base xl:text-xl max-w-screen-sm'>
                    {detailsShorter(details)}
                    <Link to={`/view/${id}`} className='text-prime ml-3 text-base hover:text-post_title dark:hover:text-white'>Continute Reading....</Link>
                </p>
            </div>
        </article>
    );
};

Post.propTypes = {
    post: PropTypes.object
};

export default Post;