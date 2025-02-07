import { useContext, useEffect } from 'react';
import Title from '../../components/reusuable/Title';
import { PostContext } from '../../providers/PostProvider';
import { Link } from 'react-router-dom';

const Categories = () => {
    const { categories, catLoading } = useContext(PostContext);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    return (<section className='pb-28 mt-12 max-w-screen-lg mx-auto px-2'>
        <Title title="All Categories" />
        {catLoading ? <div className='mt-12 py-20 mb-1 flex justify-center items-center'>
                <span className="loading text-prime loading-spinner loading-lg"></span>
            </div> : <div className='grid sm:grid-cols-2 gap-2 sm:gap-5'>
            {categories && categories.map(cat => <Link
                className='text-2xl uppercase font-bold border border-prime py-5 text-center rounded bg-transparent hover:bg-prime hover:border-desc text-prime hover:text-white'
                key={cat.id}
                to={`/category/${cat.id}`}>
                {cat.name}
            </Link>)}
        </div>}
    </section>);
};

export default Categories;