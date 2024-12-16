import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const BottomNavItem = ({ to = "", name = "", setOpen }) => {
    return (<li className="px-5 font-bold uppercase">
        <NavLink
            className={({ isActive }) => (isActive ? 'text-prime' : 'text-sec_title dark:text-white hover:text-prime dark:hover:text-prime')}
            onClick={() => setOpen(false)}
            to={to}>
            {name}
        </NavLink>
    </li>);
};

BottomNavItem.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string,
    setOpen: PropTypes.func
}

export default BottomNavItem;