import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryBtn = ({cat}) => {
    const {id, name} = cat || {};

    return (<Link
        className='uppercase border border-transparent hover:border-prime text-xs text-white hover:text-prime hover:bg-transparent bg-prime rounded-full px-2 sm:px-3 py-1'
        to={`/category/${id}`}>
        {name}
    </Link>);
};

CategoryBtn.propTypes = {
    cat: PropTypes.object
};

export default CategoryBtn;