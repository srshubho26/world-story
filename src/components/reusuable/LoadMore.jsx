import PropTypes from "prop-types";

const LoadMore = ({loadMore}) => {
    const handleLoadMore = ()=>{
        loadMore(prev=>prev+6);
    }
    return (
        <button onClick={handleLoadMore} className="btn w-full max-w-80 mx-auto block mt-10 hover:bg-prime border-prime text-prime hover:text-white text-lg bg-transparent">Load More</button>
    );
};

LoadMore.propTypes = {
    loadMore: PropTypes.func
}

export default LoadMore;