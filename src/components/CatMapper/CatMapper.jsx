import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../providers/PostProvider';
import CategoryBtn from './CategoryBtn';

const CatMapper = ({ids, containerClass=""}) => {
    const {categories, catLoading} = useContext(PostContext);
    const [filteredCat, setFilteredCat] = useState(null);

    useEffect(()=>{
        if(!categories || !ids)return;
        const idsArr = Object.keys(ids).map(id=>parseInt(id));
        const filtered = categories.filter(cat=>idsArr.includes(cat.id));
        setFilteredCat(filtered);
    }, [categories, ids]);

    return (<div className={"flex gap-2 items-center " + containerClass}>{
        catLoading
            ?
        <span className="loading loading-spinner text-prime loading-md"></span>
         : 
        filteredCat && filteredCat.map(cat=><CategoryBtn key={cat.id} cat={cat}/>)

    }</div>);
};

CatMapper.propTypes = {
    ids: PropTypes.object,
    containerClass: PropTypes.string
};

export default CatMapper;