import { useContext } from "react";
import Title from "../../Title/Title";
import { PostContext } from "../../../providers/PostProvider";
import { Link } from "react-router-dom";

const FooterRight = () => {
    const {categories, catLoading} = useContext(PostContext);

    return (
        <div>
            <div>
                <Title title="Newsletter" textColor="text-white" bg="before:bg-white" />

                <form>
                    <input className="bg-white text-sec_title border-0 rounded-full px-8 py-4 block w-full text-base" type="text" placeholder="Enter Your Email Address" />
                    <button className="text-white bg-prime rounded-full py-3  px-8 mt-6 font-bold text-base tracking-wide">Subscribe</button>
                </form>
            </div>

            <div className="border-t border-[#454545] mt-10 pt-10">
                <Title title="Categories" textColor="text-white" bg="before:bg-white" />

                <div className="uppercase text-base text-white gap-y-5 grid grid-cols-2 gap-5">
                    {catLoading ? <div className='min-h-52 flex justify-center items-center col-span-full'>
                <span className="loading loading-spinner text-prime loading-lg"></span>
            </div> : categories && categories.map(cat=><Link
                        to={`/category/${cat.id}`}
                        className="hover:text-prime"
                        key={cat.id}>
                        {cat.name}
                    </Link>)}
                </div>
            </div>
        </div>
    );
};

export default FooterRight;