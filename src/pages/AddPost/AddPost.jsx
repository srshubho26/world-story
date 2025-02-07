import { Link } from "react-router-dom";
import Title from "../../components/reusuable/Title";
import ImgUpload from "../../components/reusuable/ImgUpload";
import Loading from "../../components/reusuable/Loading";
import { useContext, useRef, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import Editor from 'react-simple-wysiwyg';

const AddPost = () => {
    const [html, setHtml] = useState('');
    function onChange(e) {
        setHtml(e.target.value);
      }

    const [loading, setLoading] = useState(false);
    const {categories, catLoading} = useContext(PostContext);
    const handleSubmit = async e => {
        e.preventDefault();
    }

    return (<section className='max-w-screen-xl mx-auto py-16 px-2 xl:px-0'>
        <Title title="add new post" />

        <form onSubmit={handleSubmit} className={(loading ? 'p-3' : 'p-0') + " card-body w-full relative"}>
            <Loading loading={loading} />

            <div className="form-control">
                <label className="label">
                    <span className="label-text dark:text-white text-lg">Post Title</span>
                </label>
                <input type="text" name="title" placeholder="Title" className="input input-bordered dark:bg-post_title dark:text-white" required />
            </div>

            <div className="form-control my-10">
                <label className="label">
                    <span className="label-text dark:text-white text-lg">Select Category</span>
                </label>

                <div className="flex gap-5 flex-wrap relative min-h-10">
                <Loading loading={catLoading}/>
                    {categories?.map(cat=>(<label
                     key={cat?.id} 
                    className="label cursor-pointer gap-2 bg-prime px-4 rounded"
                    >
                        <span className="label-text text-lg capitalize text-white">{cat?.name}</span>
                        <input type="checkbox" className="checkbox bg-white" />
                    </label>))}
                    
                </div>
            </div>

            <ImgUpload label="Thumbnail" required={true} />

            <div className="form-control my-10 dark:text-white">
                <label className="label">
                    <span className="label-text dark:text-white text-lg">Description</span>
                </label>

                <Editor value={html} onChange={onChange} />
                </div>

            <div className="form-control mt-6">
                <button className="rounded-md p-3 bg-prime border border-prime hover:bg-transparent text-white hover:text-prime">
                    Post
                </button>
            </div>
        </form>
    </section>);
};

export default AddPost;