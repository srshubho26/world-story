import { useContext, useEffect, useState } from "react";
import PostForm from "../../components/reusuable/PostForm";
import Title from "../../components/reusuable/Title";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import { toast } from "react-toastify";
import Loading from "../../components/reusuable/Loading";
import { uploadImg } from "../../assets/utilities/uploadImg";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const EditPost = () => {
    const { id } = useParams();
    const { loadSingle, updatePost } = useContext(PostContext);
    const { user } = useContext(AuthContext);
    const [singlePost, setSinglePost] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const editPostAction = async (payload, imgFile) => {
        if (!user || user?.uid !== singlePost.posted_by) {
            return navigate("/home");
        }

        if (imgFile) {
            const imgRes = await uploadImg(imgFile);
            if (!imgRes.success) {
                return imgRes;
            }
            payload.thumbnail = imgRes?.imgUrl;
        }
        await updatePost(payload, id);
        return {
            success: true,
            message: "Your blog is updated successfully."
        }
    }

    useEffect(() => {
        const loadSinglePost = async () => {
            setLoading(true);
            try {
                const data = await loadSingle(id);
                const post = data.val();
                if (!post || post?.posted_by !== user?.uid) return navigate("/home");
                setSinglePost(post);
            } catch {
                toast.error("Oops! Something went wrong.");
            } finally {
                setLoading(false);
            }
        }
        loadSinglePost();
    }, [loadSingle, id, navigate, user])

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (<section className='max-w-screen-lg mx-auto py-16 px-2 xl:px-0'>
        <Helmet>
            <title>Edit Blog - World Story</title>
        </Helmet>

        <Title title="Edit your post" />

        <div className="relative w-full min-h-96">
            <Loading loading={loading} />
            {!loading && <PostForm serverActionOnSubmit={editPostAction} postData={singlePost} />}
        </div>
    </section>);
};

export default EditPost;