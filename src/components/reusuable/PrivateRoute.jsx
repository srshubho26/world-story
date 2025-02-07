import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();

    if (!user) return <Navigate to="/login" state={pathname} />
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.object
};

export default PrivateRoute;