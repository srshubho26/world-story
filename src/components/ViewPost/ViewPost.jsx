import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CatMapper from '../CatMapper/CatMapper';
import formatDate from '../../assets/utilities/dateTimeFormatter';
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { PostContext } from '../../providers/PostProvider';

const ViewPost = () => {
    const detailsRef = useRef();
    const [singleData, setSingleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { loadSingle } = useContext(PostContext);
    const { thumbnail, title, posted_on, details, category, tags } = singleData || {};

    const navigate = useNavigate();

    useEffect(() => {
        if (singleData) return;
        loadSingle(id)
            .then(res => {
                const val = res.val();
                if(!val){
                    navigate("/home");
                    return;
                }
                setSingleData(val);
                setLoading(false);
            })

    }, [singleData, navigate, loadSingle, id]);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    useEffect(() => {
        if (details) {
            detailsRef.current.innerHTML = details;
        }
    }, [details]);

    return (<section className='pb-20 mt-12 md:mt-10 max-w-screen-lg mx-auto px-2'>
        <img src={thumbnail} className='max-w-full max-h-screen rounded-md' />
        <div className='pt-5 mb-10'>
            {loading ? <div className='justify-center h-[calc(100vh-200px)] flex items-center'>
                <span className="loading loading-spinner text-prime loading-lg"></span>
            </div> : <>
                <h2 className='text-post_title dark:text-secondary text-2xl sm:text-4xl font-bold'>{title}</h2>

                <div className='my-2 sm:my-4 flex items-center gap-3 sm:gap-6'>
                    <CatMapper ids={{ ...category }} />

                    <span className='text-sec_title text-sm sm:text-base uppercase'>{formatDate(posted_on)}</span>
                </div>

                <p ref={detailsRef} className='text-post_title dark:text-desc text-lg mt-10'></p>

                <div className='my-10 sm:flex items-center text-sec_title dark:text-white text-xl gap-x-5'>
                    <strong>Tags: </strong>

                    <ul className='flex flex-wrap gap-x-4 text-prime'>
                        {tags && tags.map((tag, i) => <li key={i}>#{tag}</li>)}
                    </ul>
                </div>

                <div className='sm:flex items-center text-sec_title dark:text-white text-xl gap-x-12'>
                    <strong>Share: </strong>

                    <ul className='flex text-3xl text-white items-center flex-wrap gap-3 sm:gap-x-5'>
                        <li>
                            <Link className='border border-white hover:bg-white hover:border-prime hover:text-prime rounded-md p-2 bg-prime block duration-300'>
                                <FaFacebookF />
                            </Link>
                        </li>

                        <li>
                            <Link className='border border-white hover:bg-white hover:border-prime hover:text-prime rounded-md p-2 bg-prime block duration-300'>
                                <FaTwitter />
                            </Link>
                        </li>

                        <li>
                            <Link className='border border-white hover:bg-white hover:border-prime hover:text-prime rounded-md p-2 bg-prime block duration-300'>
                                <FaTelegramPlane />
                            </Link>
                        </li>

                        <li>
                            <Link className='border border-white hover:bg-white hover:border-prime hover:text-prime rounded-md p-2 bg-prime block duration-300'>
                                <IoLogoWhatsapp />
                            </Link>
                        </li>

                        <li>
                            <Link className='border border-white hover:bg-white hover:border-prime hover:text-prime rounded-md p-2 bg-prime block duration-300'>
                                <FaLinkedinIn />
                            </Link>
                        </li>
                    </ul>
                </div>
            </>}
        </div>
    </section>);
};

export default ViewPost;