import { FaCalendarDays } from "react-icons/fa6";
import formatDate from "../../../../assets/utilities/dateTimeFormatter";
import CatMapper from "../../../CatMapper/CatMapper";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BannerSmallPost = ({post}) => {
    const {id, thumbnail, title, posted_on, category} = post;
    const renderOneCategory = {[Object.keys(category)[0]]: true};

    return (
        <div className="relative">
            <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
            <CatMapper ids={renderOneCategory} containerClass="absolute top-3 lg:top-6 right-2 lg:right-5"/>
            <div
                className="absolute bottom-0 left-0 w-full px-2 lg:px-5 py-3 lg:py-7 bg-gradient-to-t from-[#000000] via-[#0e0e0e85] to-transparent">
                <h3 className="uppercase font-bold text-base sm:text-sm xl:text-xl text-white hover:text-prime">
                    <Link to={`/view/${id}`}>{title}</Link>
                </h3>
                <div
                    className='text-white text-sm lg:text-base uppercase flex gap-3 items-center'>
                    <FaCalendarDays />
                    <span>{formatDate(posted_on)}</span>
                </div>
            </div>
        </div>
    );
};

BannerSmallPost.propTypes = {
    post: PropTypes.object
}

export default BannerSmallPost;