import { toast } from "react-toastify";
import Title from "../../components/reusuable/Title";
import { BsSendFill } from "react-icons/bs";
import { useEffect } from "react";
import contact from "../../assets/img/contact.svg";

const Contact = () => {
    const handleSend = e => {
        e.preventDefault();
        toast.success("Thank you for your message.");
        e.target.reset();
    }

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    return (<section className="py-16 max-w-screen-md lg:max-w-screen-xl mx-auto px-2">
        <Title title="Contact us" />

        <div className="flex flex-col-reverse lg:flex-row gap-5 items-center">
            <div>
                <p className="text-base text-desc mb-10">Your openion is so much valuabe to us. We are eagerly waiting to know about your thoughts. Feel free to express what&apos;s on your mind. We will definetely work on that.</p>

                <form onSubmit={handleSend} className="flex flex-wrap gap-8">
                    <input required type="text" placeholder="Name" className="input w-full bg-transparent border-0 border-b rounded-none border-prime placeholder:text-prime focus:outline-none focus:border-desc text-sec_title dark:text-white px-1 text-base pb-1 focus:pb-2 h-auto" />

                    <input required type="email" placeholder="Email" className="input w-full bg-transparent border-0 border-b rounded-none border-prime placeholder:text-prime focus:outline-none focus:border-desc text-sec_title dark:text-white px-1 text-base pb-1 focus:pb-2 h-auto" />

                    <textarea required rows={5} className="textarea w-full bg-transparent border-0 border-b rounded-none border-prime placeholder:text-prime focus:outline-none focus:border-desc text-sec_title dark:text-white px-1 text-base" placeholder="Message"></textarea>

                    <button className="btn border-desc bg-prime text-white hover:bg-transparent hover:text-prime text-lg basis-full hover:border-prime uppercase">
                        Send
                        <BsSendFill />
                    </button>
                </form>
            </div>

            <img src={contact} alt="Contact Us" className="max-w-96 w-full lg:max-w-full lg:w-1/2" />
        </div>
    </section>);
};

export default Contact;