import PropTypes from 'prop-types';

const TopLeftPart = ({icon, text}) => {
    return (<p className="flex gap-1 items-center">
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
    </p>);
};

TopLeftPart.propTypes = {
    icon: PropTypes.object,
    text: PropTypes.string
};

export default TopLeftPart;