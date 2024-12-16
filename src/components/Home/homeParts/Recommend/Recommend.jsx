import PropTypes from 'prop-types';
import Post from './Post';
import Title from '../../../Title/Title';

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

                <div className='flex gap-y-10 sm:gap-y-4 md:gap-0 justify-between flex-wrap'>
                    {posts && posts.map(post => <Post key={post.id} post={post} />)}
                </div>
            </div>
        </section>
    );
};

Recommend.propTypes = {
    posts: PropTypes.array
};

export default Recommend;