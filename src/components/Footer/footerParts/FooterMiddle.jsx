import { useContext } from "react";
import Title from "../../Title/Title";
import { PostContext } from '../../../providers/PostProvider';
import SidebarPost from '../../Home/homeParts/Interesting/SidebarPost';

const FooterMiddle = () => {
    const { sidebarPost, sidebarPostLoading } = useContext(PostContext);

    return (
        <div>
            <Title extra="mb-0" title="Popular Post" textColor="text-white" bg="before:bg-white" />

            {sidebarPostLoading ? <div className='min-h-96 flex justify-center items-center'>
                <span className="loading loading-spinner text-prime loading-lg"></span>
            </div> : sidebarPost && sidebarPost.slice(4, 7).map(post => <SidebarPost
                key={post.id}
                post={post}
                titleColor="text-white"
                dateColor="text-white"
                border="border-[#454545]"
            />)}
        </div>
    );
};

export default FooterMiddle;