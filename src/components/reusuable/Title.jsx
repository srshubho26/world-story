import PropTypes from 'prop-types';

const Title = ({title, bg="before:to-secondary", maxWidth="before:max-w-full", textColor="text-sec_title", extra=""}) => {
    return (<h2
        className={`uppercase pb-5 tracking-wide text-2xl sm:text-4xl font-extrabold ${textColor} relative before:content-[''] before:absolute before:left-1/2 before:bottom-0 before:w-full ${maxWidth} before:h-2 before:bg-gradient-to-r before:from-prime before:from-[45px] ${bg} before:to-[45px] before:-translate-x-1/2 dark:text-white mb-10 ${extra}`}>
            {title}
    </h2>);
};

Title.propTypes = {
    title: PropTypes.string,
    bg: PropTypes.string,
    maxWidth: PropTypes.string,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
    extra: PropTypes.string
};

export default Title;