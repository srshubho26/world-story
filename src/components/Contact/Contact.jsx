import { toast } from "react-toastify";
import Title from "../Title/Title";
import { BsSendFill } from "react-icons/bs";
import { useEffect } from "react";

const Contact = () => {
    const handleSend = e => {
        e.preventDefault();
        toast.success("Thank you for your message.");
        e.target.reset();
    }

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    return (<section className="py-16 max-w-4xl mx-auto px-2">
        <Title title="Contact us" />

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
    </section>);
};

export default Contact;