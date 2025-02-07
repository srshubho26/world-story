import { PiMaskSadLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (<section className="text-title p-2 flex flex-col justify-center items-center h-screen bg-prime gap-5 text-center">
        <span className="text-[200px] text-title"><PiMaskSadLight /></span>
        <h2 className="text-4xl sm:text-6xl font-bold uppercase text-secondary">404 not found!</h2>
        <p className="text-2xl font-semibold">
            The page you are trying to visit doesn&apos;t exist.<br/>
            Go to <Link to="/home" className="text-sec_title uppercase">Home Page</Link>
        </p>
    </section>);
};

export default Error404;