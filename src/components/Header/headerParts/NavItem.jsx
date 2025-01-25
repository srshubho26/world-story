import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ to = "", name = "", setOpen }) => {
    return (<li className="px-5 lg:p-0 font-bold uppercase">
        <NavLink
            className={({ isActive }) => (isActive ? 'text-prime' : 'text-sec_title dark:text-white hover:text-prime dark:hover:text-prime')}
            onClick={() => setOpen(false)}
            to={to}>
            {name}
        </NavLink>
    </li>);
};

NavItem.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string,
    setOpen: PropTypes.func
}

export default NavItem;