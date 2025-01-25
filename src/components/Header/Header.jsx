import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import DarkBtn from "./headerParts/DarkBtn";
import NavItem from "./headerParts/NavItem";
import { AuthContext } from "../../providers/AuthProvider";
import userThumb from "../../assets/img/user.png";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);
    const { setIsDark } = useContext(PostContext);
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout()
        .then(()=>{
            navigate("/login");
        })
    }

    useEffect(() => {
        let prevScroll = 0;
        window.onscroll = () => {
            setScrollingDown(window.scrollY > prevScroll ? true : false);
            prevScroll = window.scrollY;
        }
    }, []);

    return (<header className={`${scrollingDown ? '-top-52' : 'top-0'} border-b border-prime z-10 fixed w-full`}>
        <nav className="px-2 py-4 sm:py-7 bg-[#ffffffe9] dark:bg-[#1c0014e9]">
            <div className="relative flex justify-between items-center max-w-screen-xl mx-auto">
                <div className="flex gap-2 items-center">
                    <h2 className="text-prime tracking-wide text-xl sm:text-3xl font-black uppercase">
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
                    <ul className="flex-col lg:flex-row gap-5 flex justify-center">
                        <NavItem setOpen={setOpen} to="/home" name="Home" />
                        <NavItem setOpen={setOpen} to="/all-posts" name="Posts" />
                        <NavItem setOpen={setOpen} to="/categories" name="Categories" />
                        <NavItem setOpen={setOpen} to="/contact" name="Contact" />
                        {user ? null : <NavItem setOpen={setOpen} to="/login" name="Login" />}
                    </ul>
                </div>

                {user ? <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full border border-prime">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.photoURL || userThumb} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white border border-prime rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>

                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div> : null}
            </div>
        </nav>
    </header>);
};

export default Header;