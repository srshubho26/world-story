import { useContext } from "react";
import Title from "../../reusuable/Title";
import { PostContext } from '../../../providers/PostProvider';
import { Link } from "react-router-dom";

const FooterMiddle = () => {
    const { categories, catLoading } = useContext(PostContext);

    return (
        <div>
            <Title title="Categories" textColor="text-white" bg="before:bg-white" />

            <div className="uppercase text-sm xl:text-base text-white gap-y-5 grid grid-cols-2 gap-5">
                {catLoading ? <div className='min-h-52 flex justify-center items-center col-span-full'>
                    <span className="loading loading-spinner text-prime loading-lg"></span>
                </div> : categories && categories.map(cat => <Link
                    to={`/category/${cat.id}`}
                    className="hover:text-prime"
                    key={cat.id}>
                    {cat.name}
                </Link>)}
            </div>
        </div>
    );
};

export default FooterMiddle;