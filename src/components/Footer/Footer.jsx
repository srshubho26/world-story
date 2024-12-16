import { Link } from 'react-router-dom';
import FooterLeft from './footerParts/FooterLeft';
import FooterMiddle from './footerParts/FooterMiddle';
import FooterRight from './footerParts/FooterRight';

const Footer = () => {
    return (<footer>
        <div className='bg-[#242424] py-24 px-2 xl:px-0 uppercase'>
            <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-5 xl:gap-10">
                <FooterLeft />
                <FooterMiddle />
                <FooterRight />
            </div>
        </div>

        <div className='bg-[#191919] py-6 px-2 xl:px-0'>
            <div className='max-w-screen-xl mx-auto text-base text-white flex flex-col md:flex-row justify-between gap-2 items-center'>
                <p>&copy; Copyright All right reserved.</p>

                <div className='font-bold flex gap-5'>
                    <Link to="/home">Home</Link>
                    <Link to="/all-posts">Posts</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </div>
    </footer>);
};

export default Footer;