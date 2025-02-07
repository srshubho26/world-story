import { FaCalendarDays } from "react-icons/fa6";
import formatDate from "../../../../assets/utilities/dateTimeFormatter";
import CatMapper from "../../../../components/CatMapper/CatMapper";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BannerSmallPost = ({ post }) => {
    const { id, thumbnail, title, posted_on, category } = post;
    const renderOneCategory = { [Object.keys(category)[0]]: true };

    return (<div className="relative">
        <img src={thumbnail} alt={title} className="aspect-[3/2] h-full w-full object-cover" />
        <CatMapper ids={renderOneCategory} containerClass="absolute top-2 right-2 2xl:right-5 2xl:top-5" />
        <div
            className="absolute bottom-0 left-0 w-full px-2 lg:px-3 py-3 lg:pb-3 lg:pt-7 bg-gradient-to-t from-[#000000] via-[#0e0e0ea0] to-transparent 2xl:pl-5 2xl:pb-5">
            <h3 className="uppercase font-bold text-base sm:text-sm xl:text-base text-white hover:text-prime">
                <Link to={`/view/${id}`}>{title}</Link>
            </h3>
            <div
                className='text-white text-sm lg:text-base uppercase flex gap-3 items-center'>
                <FaCalendarDays />
                <span>{formatDate(posted_on)}</span>
            </div>
        </div>
    </div>);
};

BannerSmallPost.propTypes = {
    post: PropTypes.object
}

export default BannerSmallPost;