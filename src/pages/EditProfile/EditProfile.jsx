import { useContext, useEffect, useState } from "react";
import Title from "../../components/reusuable/Title"
import { AuthContext } from "../../providers/AuthProvider";
import ImgUpload from "../../components/reusuable/ImgUpload";
import Loading from "../../components/reusuable/Loading";
import { uploadImg } from "../../assets/utilities/uploadImg";
import { toast } from "react-toastify";
import userThumb from "../../assets/img/user.png";
import { Helmet } from "react-helmet-async";

const EditProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const img = form.img.files[0];
        let photoURL = "";
        setLoading(true);

        try {
            if (img) {
                const imgUploadRes = await uploadImg(img);
                if (!imgUploadRes.success) {
                    toast.error(imgUploadRes.message);
                    setLoading(false);
                    return;
                }
                photoURL = imgUploadRes.imgUrl;
            }
            const res = await updateUser(name, photoURL);
            if (res?.email) {
                toast.success("Profile updated successfully.");
                setLoading(false);
            }
        } catch (err) {
            let msg = `Someting went wrong! Note: ${err.message}`;

            toast.error("Error! " + msg);
            setLoading(false);
        }
    }

    return (<section className="py-16 max-w-screen-md mx-auto px-2">
        <Title title="Edit Your Profile" />
        <Helmet>
            <title>Edit Profile - World Story</title>
        </Helmet>

        <div className="flex flex-col md:flex-row items-center gap-5 relative p-2">
            <Loading loading={loading} />

            <img src={user?.photoURL || userThumb} alt={user?.displayName} className="w-full max-w-xs aspect-square object-cover p-2 border rounded-md" />

            <form className="w-full max-w-md " onSubmit={handleSubmit}>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white text-lg">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Name" className="input input-bordered dark:bg-post_title dark:text-white" required defaultValue={user?.displayName} />
                </div>

                <div className="form-control my-5">
                    <label className="label">
                        <span className="label-text dark:text-white text-lg">Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} className="input input-bordered dark:bg-post_title dark:text-white opacity-70" readOnly />
                </div>

                <ImgUpload />

                <div className="form-control mt-8">
                    <button className="rounded-md p-3 bg-prime border border-prime hover:bg-transparent text-white hover:text-prime">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </section>);
};

export default EditProfile;