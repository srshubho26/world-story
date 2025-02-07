import { useContext, useEffect, useState } from "react";
import Loading from "../../components/reusuable/Loading";
import registerImg from "../../assets/img/register.svg";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/reusuable/Title";
import ImgUpload from "../../components/reusuable/ImgUpload";
import { uploadImg } from "../../assets/utilities/uploadImg";
const Register = () => {
    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        user && navigate("/home");
    }, [user, navigate]);

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const pass = form.pass.value;
        const img = form.img.files[0];

        const passRequirement = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passRequirement.test(pass)) {
            toast.error('Password must have an uppercase & a lowercase character, a digit & length should be at least 6 characters');
            return;
        }

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
            const registerRes = await register(email, pass, name, photoURL);
            if (registerRes?.email) {
                toast.success("User created successfully.");
                setLoading(false);
            }
        } catch (err) {
            let msg = "Someting went wrong!";
            err.code === 'auth/email-already-in-use' && (msg = 'Email already exists.');

            toast.error("Error! " + msg);
            setLoading(false);
        }
    }

    return (<section className="py-10 px-2">
        <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <form onSubmit={handleSubmit} className={(loading ? 'p-3' : 'p-0') + " card-body w-full max-w-md relative"}>
                    <Loading loading={loading} />

                    <Title title="Register" />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-lg">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered dark:bg-post_title dark:text-white" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-lg">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered dark:bg-post_title dark:text-white" required />
                    </div>

                    <ImgUpload />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-lg">Password</span>
                        </label>
                        <input type="password" name="pass" placeholder="Password" className="input input-bordered dark:bg-post_title dark:text-white" required />

                        <label className="mt-3 text-desc text-lg">
                            Already have an account? <Link to="/login" className="font-semibold hover:text-prime ml-2">
                                Login
                            </Link>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="rounded-md p-3 bg-prime border border-prime hover:bg-transparent text-white hover:text-prime">
                            Login
                        </button>
                    </div>
                </form>

                <img src={registerImg} alt="Login" className="max-w-sm lg:max-w-xl" />
            </div>
        </div>
    </section>);
};

export default Register;