import { toast } from "react-toastify";
import Title from "../../reusuable/Title";

const FooterRight = () => {
    const handleSubmit = e=>{
        e.preventDefault();
        toast.success("Thanks for joining our newsletter.");
        e.target.reset();
    }

    return (
        <div>
            <div>
                <Title title="Newsletter" textColor="text-white" bg="before:bg-white" />

                <form onSubmit={handleSubmit}>
                    <input className="bg-white text-sec_title border-0 rounded-full px-8 py-4 block w-full text-base" type="email" required placeholder="Enter Your Email Address" />
                    <button className="text-white bg-prime rounded-full py-3  px-8 mt-6 font-bold text-base tracking-wide">Subscribe</button>
                </form>
            </div>
        </div>
    );
};

export default FooterRight;