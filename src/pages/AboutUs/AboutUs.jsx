import { useEffect } from "react";
import Title from "../../components/reusuable/Title";
import about from "../../assets/img/about.svg";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    return (<section className='pb-28 mt-12 max-w-screen-md lg:max-w-screen-xl mx-auto px-2'>
        <Title title="About Us" />

        <div className="flex flex-col-reverse lg:flex-row lg:gap-5 items-center">
            <div className="dark:text-white text-justify">
                <p>Welcome to WorldStory, a platform where stories come to life! We believe that everyone has a story to tell, and our mission is to provide a space where writers and readers from all walks of life can connect, share, and inspire.</p>

                <h4 className="text-xl font-semibold mt-5">Our Vision</h4>
                <p>At WorldStory, we aim to create a vibrant community where thoughts, experiences, and knowledge flow freely. Whether it is a personal journey, an insightful analysis, or a creative piece, we want to be the bridge that brings diverse perspectives together.</p>

                <h4 className="text-xl font-semibold mt-5">What We Offer</h4>
                <p>WorldStory is more than just a blog site—it is a platform for storytellers, thinkers, and knowledge seekers. Here is what you can expect:</p>

                <p className="my-3"><strong>Read &amp; Explore: </strong>
                    Our blog is home to a wide variety of content, from thought-provoking essays to lighthearted stories. Readers can explore different categories, discover new ideas, and engage with content that resonates with them.</p>

                <p className="my-3"><strong>Write &amp; Publish: </strong>
                    Are you passionate about writing? At WorldStory, authenticated users can publish their own blogs and share their thoughts with the world. Whether you are an experienced writer or just starting out, our platform is open to everyone who wants to express themselves.</p>

                <p className="my-3"><strong>Edit &amp; Improve: </strong>
                    We believe that writing is an evolving process. That is why we allow authors to modify and refine their own blogs even after publishing. Your voice matters, and we want to make sure you can present your ideas exactly the way you want.</p>
            </div>

            <img src={about} alt="About us" className="max-w-xl w-full lg:max-w-full lg:w-1/2" />
        </div>
    </section>)
};

export default AboutUs;