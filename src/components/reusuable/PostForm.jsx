import { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { PostContext } from '../../providers/PostProvider';
import ImgUpload from './ImgUpload';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';

const labelTxt = "label-text dark:text-white text-lg font-semibold";

const PostForm = ({ serverActionOnSubmit, postData }) => {
    const {title: _title, category: previouslyAddedCats, thumbnail, details: _details, tags: _tags} = postData || {};

    const prevAddedCats = previouslyAddedCats ? {...previouslyAddedCats} : {}

    const editorRef = useRef();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { categories, catLoading } = useContext(PostContext);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState(_tags ? [..._tags] : []);

    const removeTag = e => {
        const btn = e.target.closest("button");
        const tagToDelete = btn.getAttribute('data-tag');
        const filteredTags = tags.filter(_tag => _tag !== tagToDelete);
        setTags(filteredTags);
        if (!btn) return;
    }

    const submitForm = async e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = {};
        [...form.cats].filter(cat => cat.checked).forEach(cat => { category[cat.id] = true });
        const details = editorRef.current.getContent();

        if (!Object.keys(category).length) {
            toast.warning("Please select category!");
            return;
        }

        if (!details) {
            toast.warning("Please write description!");
            return;
        }

        if (!tags.length) {
            toast.warning("Please enter tags!");
            return;
        }
        const payload = { title, category, details, tags }
        if(!postData){
            payload.posted_on = Date.now();
            payload.posted_by = user.uid;
        }

        setLoading(true);
        try {
            const res = await serverActionOnSubmit(payload, form.img.files[0]);

            toast[!res?.success ? "error" : "success"](res?.message);
        } catch {
            toast.error("Oops! Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    return (<form onSubmit={submitForm} className={(loading ? 'p-3' : 'p-0') + " card-body w-full relative"}>
        <Loading loading={loading} />

        <div className="form-control">
            <label className="label">
                <span className={labelTxt}>Post Title</span>
            </label>
            <input type="text" name="title" placeholder="Title" className="input input-bordered dark:bg-post_title dark:text-white" required defaultValue={_title ?? ""} />
        </div>

        <div className="form-control my-10">
            <label className="label">
                <span className={labelTxt}>Select Category</span>
            </label>

            <div className={(catLoading ? "min-h-48" : "") + " flex gap-3 flex-wrap relative"}>
                <Loading loading={catLoading} />
                {categories?.map(cat => (<label
                    key={cat?.id}
                    className="label cursor-pointer gap-2 border border-prime px-4 rounded-md"
                >
                    <span className="label-text text-lg capitalize text-prime">{cat?.name}</span>
                    <input 
                    type="checkbox" 
                    id={cat?.id} 
                    name="cats" 
                    className="checkbox border-prime"
                    defaultChecked={prevAddedCats[cat?.id]}
                     />
                </label>))}

            </div>
        </div>

        <ImgUpload label="Thumbnail" defaultPrevImg={thumbnail} required={!postData} maxWidth="max-w-screen-md aspect-[3/2]" />

        <div className="form-control my-10 dark:text-white">
            <label className="label">
                <span className={labelTxt}>Description</span>
            </label>

            <Editor
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={_details ?? ''}

                apiKey='cayoa6qp160q9era318d8o781ao41bdfr5ete77bakpx0pqf'
                init={{
                    menubar: false,
                    toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link | align lineheight | numlist bullist indent outdent | removeformat'
                }}
            />
        </div>

        <div className="form-control flex-row gap-3 flex-wrap" onClick={removeTag}>
            {tags.map((_tag, i) => <button key={i} data-tag={_tag} type="button" className="px-4 py-1 border border-prime rounded-md text-prime hover:bg-prime hover:text-white tooltip" data-tip="Delete Tag">
                {_tag}
            </button>)}
        </div>

        <div className="form-control">
            <label className="label">
                <span className={labelTxt}>Tags</span>
            </label>

            <div className="w-full flex gap-2">

                <input
                    type="text"
                    placeholder="Enter Tag Name"
                    className="input input-bordered dark:bg-post_title dark:text-white grow"
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                />
                <button type="button" className="border border-prime rounded-md px-5 py-2 text-prime hover:bg-prime hover:text-white" onClick={() => {
                    if (!tag) return;
                    if (tags.includes(tag)) {
                        toast.warn("Tag is alreay added!");
                        return;
                    }
                    setTags([...tags, tag]);
                    setTag('');
                }}>Add Tag</button>
            </div>
        </div>

        <div className="form-control mt-6">
            <button className="rounded-md p-3 bg-prime border border-prime hover:bg-transparent text-white hover:text-prime">
                {postData ? 'Update' : 'Post'}
            </button>
        </div>
    </form>);
};

PostForm.propTypes = {
    serverActionOnSubmit: PropTypes.func,
    alreadyAddedTags: PropTypes.array,
    postData: PropTypes.object
};

export default PostForm;