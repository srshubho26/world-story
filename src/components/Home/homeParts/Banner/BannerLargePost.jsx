import PropTypes from 'prop-types';
import CatMapper from '../../../CatMapper/CatMapper';
import formatDate from '../../../../assets/utilities/dateTimeFormatter';
import { Link } from 'react-router-dom';
import { detailsShorter } from '../../../../assets/utilities/detailsShorter';

const BannerLargePost = ({ post }) => {
    const { id, thumbnail, title, posted_on, details, category } = post || {};

    return (<div className='relative h-96 sm:h-full border-b-8 border-prime'>
        <img className='w-full h-full object-cover' src={thumbnail} alt={title} />

        <div
            className='absolute bottom-0 py-5 lg:pb-14 left-0 w-full px-3 sm:px-5 lg:pl-14 bg-gradient-to-t from-[#000000] via-[#0e0e0e94] to-transparent'
        >
            <h1 className='text-white font-bold uppercase text-xl xl:text-3xl'>{title}</h1>
            <div className='my-2 sm:my-4 flex flex-wrap items-center gap-3 sm:gap-6'>
                <CatMapper ids={{ ...category }} />
                <span className='text-white text-sm sm:text-base pl-3 sm:pl-6 border-l-2 uppercase border-white'>{formatDate(posted_on)}</span>
            </div>
            <p className='text-white text-base xl:text-lg leading-tight max-w-screen-md'>
                {detailsShorter(details, 300)}
                <Link className='ml-3 text-prime hover:text-white' to={`/view/${id}`}>
                    Continue Reading....
                </Link>
            </p>
        </div>
    </div>);
};

BannerLargePost.propTypes = {
    post: PropTypes.object,
    cat: PropTypes.object
};

export default BannerLargePost;