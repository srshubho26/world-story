import Title from "../../components/reusuable/Title";
import loginImg from "../../assets/img/login.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/reusuable/Loading";

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && navigate("/home");
    }, [user, navigate]);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pass = form.pass.value;
        setLoading(true);
        login(email, pass)
            .then(() => {
                setLoading(false);

            }).catch(({ code }) => {
                let msg = "Someting went wrong!";

                if (code === 'auth/invalid-credential') {
                    msg = "Invalid Email Or Password";
                }

                toast.error("Error! " + msg);
                setLoading(false);
            })
    }

    return (<section className="pb-10 px-2">
        <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <form onSubmit={handleSubmit} className={(loading ? 'p-3' : 'p-0') + " card-body w-full max-w-md relative"}>
                    <Loading loading={loading} />

                    <Title title="Login" />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-lg">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered dark:bg-post_title dark:text-white" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-lg">Password</span>
                        </label>
                        <input type="password" name="pass" placeholder="Password" className="input input-bordered dark:bg-post_title dark:text-white" required />

                        <label className="mt-3 text-desc text-lg">
                            Don&apos;t have an account? <Link to="/register" className="font-semibold hover:text-prime ml-2">Register</Link>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="rounded-md p-3 bg-prime border border-prime hover:bg-transparent text-white hover:text-prime">
                            Login
                        </button>
                    </div>
                </form>

                <img src={loginImg} alt="Login" className="max-w-sm lg:max-w-xl" />
            </div>
        </div>
    </section>);
};

export default Login;