import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const ImgUpload = ({ required = false, label="Profile Pic", maxWidth="", defaultPrevImg=null }) => {
    const imgInputRef = useRef();
    const [prevImg, setPrevImg] = useState(defaultPrevImg);

    const handlePrevImg = img => {
        const reader = new FileReader();
        reader.onload = () => setPrevImg(reader.result);
        img && reader.readAsDataURL(img);
    }

    return (<>
        <div className={(prevImg ? "" : "hidden ") + (maxWidth ? maxWidth : " aspect-square max-w-56") + " border rounded-md p-1 relative"}>
            <button
                className='absolute right-0 top-0 text-red-500 flex justify-center items-center w-full h-full bg-[#1c001476] rounded-md text-4xl opacity-0 hover:opacity-100'
                type="button"
                onClick={() => {
                    setPrevImg('');
                    imgInputRef.current.value = "";
                }}>
                <MdDelete />
            </button>

            <img src={prevImg} className="w-full h-full object-cover" />
        </div>

        <div className={(prevImg ? "hidden" : "") + " form-control"}>
            <label className="label">
                <span className="label-text dark:text-white text-lg">{label}</span>
            </label>
            <input
                type="file"
                name="img"
                className="file-input input-bordered dark:bg-post_title dark:text-white"
                required={required}
                ref={imgInputRef}
                onChange={e => handlePrevImg(e.target.files[0])}
            />
        </div>
    </>);
};

ImgUpload.propTypes = {
    prevImg: PropTypes.string,
    label: PropTypes.string,
    maxWidth: PropTypes.string,
    setPrevImg: PropTypes.func,
    required: PropTypes.bool,
    defaultPrevImg: PropTypes.string
};

export default ImgUpload;