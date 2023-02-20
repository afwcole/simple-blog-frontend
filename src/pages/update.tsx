import Navbar from '@/components/Navbar';
import { BS_API_URL, SS_API_URL } from '../../constants';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { PostProps } from '@/interfaces/PostProps';
import Head from 'next/head';

export async function getServerSideProps({ query: { postId } }: any) {
    const response = await fetch(`${SS_API_URL}/post?postId=${postId}`);
    const post: PostProps = await response.json();

    return {
        props: {
            post,
        },
    };
}


const Update = (props: { post: PostProps}) => {
    const router = useRouter();
    const [errors, setErrors] = useState<Partial<typeof formData>>({});

    const [formData, setFormData] = useState(props.post);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormValidation = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!formData.author.trim()) {
            newErrors.author = "Author is required";
        }
        if (!formData.content.trim()) {
            newErrors.content = "Content is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = handleFormValidation();
        if (!isValid) return;

        const requestBody = JSON.stringify(formData);

        const response = await fetch(`${BS_API_URL}/post`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
        });

        if (response.status === 200) {
            router.push(`/post?postId=${props.post.postId}`);
        } else {
            console.error(`Error updating post: ${response.statusText}`);
        }
    };

    return (
        <div className="h-screen bg-cyan-100 bg-">
            <Head>
                <title>Slightly Techie | Update</title>
                <link rel="slightly techie icon" href="/slightlytechie.jpeg" />
            </Head>
            <Navbar />
            <section className="container mx-auto py-10 ">
                <form className="mx-10" onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <label className="text-lg font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className={`mt-2 border-2 border-black rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? "border-red-500" : ""}`}
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <p className="text-red-500 font-bold text-xs italic mt-2">{errors.title}</p>}
                    </div>

                    <div className="mb-8 flex flex-col">
                        <label className="text-lg font-bold mb-2" htmlFor="author">
                            Author
                        </label>
                        <input
                            className={`mt-2 border-2 border-black rounded-xl md:w-1/2 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? "border-red-500" : ""}`}
                            id="author"
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                        />
                        {errors.author && <p className="text-red-500 font-bold text-xs italic mt-2">{errors.author}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="text-lg font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            className={`mt-2 border-2 border-black rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 ${errors.title ? "border-red-500" : ""}`}
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                        {errors.content && <p className="text-red-500 font-bold text-xs italic mt-2">{errors.content}</p>}
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <button className='px-6 py-3 text-sm font-bold text-black border-2 border-black bg-indigo-300 rounded-full hover:bg-indigo-400'>
                            Update
                        </button>
                    </div>
                </form>
            </section>
        </div>

    );
}

export default Update;
