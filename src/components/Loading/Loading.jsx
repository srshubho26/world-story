import PropTypes from "prop-types";

const Loading = ({loading}) => {
    return (
        <div className={(loading ? 'flex' : 'hidden') + " absolute top-0 left-0 w-full h-full bg-[#000000a2] rounded-md justify-center items-center z-20"}>
            <span className="loading loading-spinner text-prime loading-lg"></span>
        </div>
    );
};

Loading.propTypes = {
    loading: PropTypes.bool
}

export default Loading;