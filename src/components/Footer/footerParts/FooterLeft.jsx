import Title from "../../Title/Title";
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { PiEnvelope } from "react-icons/pi";
import { FaFacebookF, FaTwitter, FaPinterestP, FaRss, FaWhatsapp, } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";

const FooterLeft = () => {
    return (
        <div>
            <Title title="About us" textColor="text-white" bg="before:bg-white"/>

            <p className='text-desc text-xl normal-case'>We are dedicated to provide quality contents to our viewers based on different category. You will always find quality contents from us to make your life a little easier.</p>

            <address className='my-8 text-white text-base'>
                <div className='flex items-center gap-5'>
                    <CiLocationOn className='text-prime text-4xl'/>
                    <div>
                        <p>Monipur, Mirpur-2</p>
                        <p>Dhaka-1216</p>
                    </div>
                </div>
                
                <div className='my-8 flex items-center gap-5'>
                    <FiPhoneCall className='text-prime text-4xl'/>
                    <div>
                        <p>+88 01792-314525</p>
                        <p>+88 01722-096866</p>
                    </div>
                </div>
                
                <div className='flex items-center gap-5'>
                    <PiEnvelope className='text-prime text-4xl'/>
                    <div>
                        <p>shuvo22890@gmail.com</p>
                        <p>srs22890@gmail.com</p>
                    </div>
                </div>
            </address>

            <div className='text-prime flex gap-5 text-3xl border-t border-[#454545] pt-10'>
                <button className="hover:text-white"><FaFacebookF/></button>
                <button className="hover:text-white"><FaTwitter/></button>
                <button className="hover:text-white"><TfiYoutube/></button>
                <button className="hover:text-white"><FaPinterestP/></button>
                <button className="hover:text-white"><FaRss/></button>
                <button className="hover:text-white"><FaWhatsapp/></button>
            </div>
        </div>
    );
};

export default FooterLeft;