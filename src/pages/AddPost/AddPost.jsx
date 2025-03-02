import Title from "../../components/reusuable/Title";
import { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { uploadImg } from "../../assets/utilities/uploadImg";
import PostForm from "../../components/reusuable/PostForm";
import { useNavigate } from "react-router-dom";


const AddPost = () => {
    const { addPost } = useContext(PostContext);
    const navigate = useNavigate();

    const addPostAction = async (payload, imgFile) => {
        const imgRes = await uploadImg(imgFile);
        if(!imgRes.success){
            return imgRes;
        }
        payload.thumbnail = imgRes?.imgUrl;
        await addPost(payload);
        navigate("/home");
        return {
            success: true,
            message: "Your blog is live now."
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (<section className='max-w-screen-lg mx-auto py-16 px-2 xl:px-0'>
        <Title title="add new post" />

        <PostForm serverActionOnSubmit={addPostAction} />
    </section>);
};

export default AddPost;