import Title from "../../Title/Title";

const FooterRight = () => {

    return (
        <div>
            <div>
                <Title title="Newsletter" textColor="text-white" bg="before:bg-white" />

                <form>
                    <input className="bg-white text-sec_title border-0 rounded-full px-8 py-4 block w-full text-base" type="text" placeholder="Enter Your Email Address" />
                    <button className="text-white bg-prime rounded-full py-3  px-8 mt-6 font-bold text-base tracking-wide">Subscribe</button>
                </form>
            </div>
        </div>
    );
};

export default FooterRight;