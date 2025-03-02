import PropTypes from 'prop-types';
import Title from '../../../../components/reusuable/Title';
import PostCard from "../../../../components/reusuable/PostCard";

const Recommend = ({ posts }) => {
    return (
        <section className='py-24 bg-banner_bg dark:bg-post_title px-2 xl:px-0'>
            <div className='max-w-screen-xl mx-auto'>
                <Title
                    title="Advice from our dedicated authors"
                    maxWidth='before:max-w-md'
                    extra='text-center pb-10'
                />

                <p className='text-desc text-xl mb-16'>Our authors are so much talented. They create blogs based on their experience and research. If you still can&apos;t figure out what you should read, just follow this recommendation. We hope it will be more helpful for the new readers as they can&apos; figure out what they should read first.</p>

                <div className='flex max-w-md mx-auto md:max-w-full flex-col md:flex-row justify-between gap-5'>
                    {posts && posts.map(post => <PostCard key={post.posted_on} post={post} />)}
                </div>
            </div>
        </section>
    );
};

Recommend.propTypes = {
    posts: PropTypes.array
};

export default Recommend;