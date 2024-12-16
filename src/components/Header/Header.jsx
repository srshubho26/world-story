import { Link } from "react-router-dom";
import { FaCalendarDays, FaFacebookF, FaTwitter, FaPinterestP, FaRss, FaWhatsapp, FaBars } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { TfiYoutube } from "react-icons/tfi";
import BottomNavItem from "./headerParts/BottomNavItem";
import BottomNavIcons from "./headerParts/BottomNavIcons";
import TopLeftPart from "./headerParts/TopLeftPart";
import TopRightPart from "./headerParts/TopRightPart";
import formatDate, { formatTime } from '../../assets/utilities/dateTimeFormatter';
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import DarkBtn from "./headerParts/DarkBtn";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);
    const { categories, setIsDark, catLoading } = useContext(PostContext);
    const [trimCat, setTrimCat] = useState([]);

    useEffect(()=>{
        if(!categories)return;
        const shuffleCats = [...categories].sort(()=>Math.random()-.5);
        setTrimCat(shuffleCats.slice(0, 4));
    }, [categories])

    useEffect(() => {
        let prevScroll = 0;
        window.onscroll = () => {
            setScrollingDown(window.scrollY > prevScroll ? true : false);
            prevScroll = window.scrollY;
        }
    }, []);

    return (<header className={`${scrollingDown ? '-top-52' : 'top-0'} z-10 fixed w-full`}>
        <nav className="px-2 bg-[#ce0395e9]">
            <div className="max-w-screen-xl mx-auto flex-col md:flex-row flex justify-between text-white text-xs sm:text-base font-medium items-center">
                <div className="flex gap-3 lg:gap-10 sm:tracking-wider mt-3 md:mt-0">
                    <TopLeftPart icon={<FaCalendarDays />} text={formatDate()} />
                    <TopLeftPart icon={<MdOutlineAccessTime />} text={`${formatTime()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`} />
                </div>

                <div>
                    <ul className="flex border-y md:border-y-0 border-x border-[#de54b6] justify-center min-w-52 my-3 md:my-0">
                        {catLoading ?
                            <span className="loading loading-spinner text-white loading-sm py-4 md:py-8"></span>
                            :
                            trimCat.map(cat => <TopRightPart
                                key={cat.id}
                                to={`/category/${cat.id}`}
                                name={cat.name}
                        />)}
                    </ul>
                </div>
            </div>
        </nav>

        <nav className="px-2 py-4 sm:py-7 bg-[#ffffffe9] dark:bg-[#1c0014e9] shadow-xl dark:shadow-black">
            <div className="relative flex flex-col sm:flex-row gap-5 justify-between items-center max-w-screen-xl mx-auto">
                <div className="flex gap-2 items-center">
                    <h2 className="text-prime tracking-wide text-2xl md:text-3xl font-black uppercase">
                        <Link to="/home">
                            World<span className="text-sec_title dark:text-white">Story</span>
                        </Link>
                    </h2>

                    <DarkBtn setDark={setIsDark} />

                    <button
                        className="lg:hidden text-base md:text-xl border border-sec_title text-sec_title dark:border-white dark:text-white rounded p-2"
                        onClick={() => setOpen(!open)}
                    >
                        <FaBars />
                    </button>
                </div>

                <div className={"absolute left-1/2 sm:left-40 translate-x-1/4 sm:translate-x-0 border lg:border-none rounded lg:rounded-none py-5 lg:p-0 bg-white dark:bg-sec_title lg:bg-transparent dark:lg:bg-transparent lg:static " + (open ? "top-12" : "-top-96")}>
                    <ul className="flex-col gap-y-4 lg:flex-row flex justify-center">
                        <BottomNavItem setOpen={setOpen} to="/home" name="Home" />
                        <BottomNavItem setOpen={setOpen} to="/all-posts" name="Posts" />
                        <BottomNavItem setOpen={setOpen} to="/categories" name="Categories" />
                        <BottomNavItem setOpen={setOpen} to="/contact" name="Contact" />
                    </ul>
                </div>

                <div className="flex justify-end gap-4 md:gap-7">
                    <BottomNavIcons icon={<FaFacebookF />} to="#" />
                    <BottomNavIcons icon={<FaTwitter />} to="#" />
                    <BottomNavIcons icon={<TfiYoutube />} to="#" />
                    <BottomNavIcons icon={<FaPinterestP />} to="#" />
                    <BottomNavIcons icon={<FaRss />} to="#" />
                    <BottomNavIcons icon={<FaWhatsapp />} to="#" />
                </div>
            </div>
        </nav>
    </header>);
};

export default Header;