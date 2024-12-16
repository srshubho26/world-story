import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BottomNavIcons = ({icon, to}) => {
    return (<span className='text-prime hover:text-sec_title dark:hover:text-white text-2xl'>
        <Link to={to}>{icon}</Link>
    </span>);
};

BottomNavIcons.propTypes = {
    icon: PropTypes.object,
    to: PropTypes.string
};

export default BottomNavIcons;