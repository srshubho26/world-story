import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopRightPart = ({to, name}) => {
    return (<li className="border-x border-[#de54b6] capitalize px-3 md:px-5 py-2 md:py-5">
        <Link to={to}>{name}</Link>
    </li>);
};

TopRightPart.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string
};

export default TopRightPart;