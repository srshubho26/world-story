import { useContext, useEffect, useState } from "react";
import Title from "../../components/reusuable/Title";
import { PostContext } from "../../providers/PostProvider";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import formatDate from "../../assets/utilities/dateTimeFormatter";
import CatMapper from "../../components/CatMapper/CatMapper";
import { Link } from "react-router-dom";
import Loading from "../../components/reusuable/Loading";
import swal from "sweetalert";

const MyPosts = () => {
  const { loadUserPosts, deletePost } = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { user } = useContext(AuthContext);
  const uid = user.uid;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setLoading(true);
    const loadPosts = async () => {
      try {
        const usrPosts = await loadUserPosts(uid);
        setPosts(usrPosts);

      } catch (err) {
        console.log(err.message)
        toast.error("Oops! Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [loadUserPosts, uid]);


  const handleDelete = async e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const isConfirmed = await swal({
      title: "Are you sure?",
      text: "Your blog post will be deleted permanently.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })

    if (!isConfirmed) return;
    const author = btn.getAttribute("data-author");
    if (uid !== author) return;
    const id = btn.getAttribute("data-id");
    try {
      setLoading(true);
      await deletePost(id);
      toast.success("Your blog is deleted successfully");

    } catch {
      toast.error("Oops! Something went wrong.");

    } finally {
      setLoading(false);
    }
  }

  return (<section className='max-w-screen-xl mx-auto py-16 px-2 xl:px-0'>
    <Title title="My Posts" />

    <div className="overflow-x-auto rounded-box flex flex-col border border-desc relative min-h-80">
      <Loading loading={loading} />
      {!posts?.length ? <div className="flex justify-center items-center grow">
        <h3 className="text-2xl font-semibold text-desc">
          Your haven&apos;t published any blog yet!
        </h3>
      </div> : <table className="table dark:text-white text-base">
        <thead>
          <tr className="dark:text-white text-base">
            <th>Title</th>
            <th>Category</th>
            <th>Posted On</th>
            <th></th>
          </tr>
        </thead>
        <tbody onClick={handleDelete}>

          {posts?.map(post => (<tr key={post.id}>
            <td>{post.title}</td>
            <td><CatMapper ids={{ ...(post.category) }} /></td>
            <td>{formatDate(post.posted_on)}</td>
            <td>
              <Link to={`/edit/${post.id}`} className="hover:text-green-500">Edit</Link>
              <button data-id={post.id} data-author={post.posted_by} className="ml-2 hover:text-red-700">Delete</button>
            </td>
          </tr>))}

        </tbody>
      </table>}

    </div>
  </section>);
};

export default MyPosts;