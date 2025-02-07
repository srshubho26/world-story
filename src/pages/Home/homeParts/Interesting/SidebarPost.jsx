import PropTypes from 'prop-types';
import CatMapper from '../../../../components/CatMapper/CatMapper';
import formatDate from '../../../../assets/utilities/dateTimeFormatter';
import { Link } from 'react-router-dom';

const SidebarPost = ({post, titleColor="text-post_title", dateColor="text-sec_title", border="border-secondary"}) => {
    const {id, thumbnail, title, posted_on, category} = post;
    const get1Cat = {[Object.keys(category)[0]]: true};

    return (
        <article className={`flex gap-4 uppercase py-10 border-b ${border} last:border-0`}>
            <img className='w-36 object-cover rounded-md aspect-square' src={thumbnail} alt={title} />

            <div className='flex flex-col justify-between gap-3'>
                <h4 className={`font-bold hover:text-prime dark:text-secondary dark:hover:text-prime text-sm xl:text-lg ${titleColor}`}>
                    <Link to={`/view/${id}`}>{title}</Link>
                </h4>
                <CatMapper ids={get1Cat}/>
                <span className={`${dateColor} dark:text-white font-semibold text-sm sm:text-base`}>{formatDate(posted_on)}</span>
            </div>
        </article>
    );
};

SidebarPost.propTypes = {
    post: PropTypes.object,
    titleColor: PropTypes.string,
    dateColor: PropTypes.string,
    border: PropTypes.string
};

export default SidebarPost;