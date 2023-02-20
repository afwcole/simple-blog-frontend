import { SS_API_URL, BS_API_URL } from '../../constants';
import React from 'react'
import { PostProps } from '@/interfaces/PostProps';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';

export async function getServerSideProps(context: any) {
    const response = await fetch(`${SS_API_URL}/posts`);
    const posts: PostProps[] = await response.json();

    return {
        props: {
            posts,
        },
    }
}

const all_posts = (props: { posts: PostProps[] }) => {
    const router = useRouter();

    const handleEdit = (postId: string, e: any) => {
        e.preventDefault();
        router.push(`/update?postId=${postId}`)
    }

    const handleDelete = async (postId: string, e: any) => {
        e.preventDefault();

        const response = await fetch(`${BS_API_URL}/post?postId=${postId}`, { method: "DELETE" });

        if (response.status === 200) {
            window.location.reload();
        } else {
            console.error(`Error submitting post: ${response.statusText}`);
        }
    }


    return (
        <>
            <Head>
                <title>Slightly Techie | All Posts</title>
                <link rel="slightly techie icon" href="/slightlytechie.jpeg" />
            </Head>
            <Navbar />
            <section>
                <div className='bg-red-200 flex justify-center p-10 border-b-2 border-stone-900'>
                    <div className='md:w-1/2 flex flex-col text-center'>
                        <h1 className="mb-5 text-3xl md:text-4xl font-extrabold">
                            All Posts
                        </h1>
                        <p className='text-sm md:text-base'>
                            Read some of the best articles available on the Slightly Techie Blog, feel free to browse through as many as you like.
                        </p>
                    </div>
                </div>
                <div className="container flex flex-col mx-4 md:w-2/3 md:m-auto">
                    {props.posts.map((post) => (
                        <div key={post.postId} className="mx-10">
                            <a href={"/post?" + new URLSearchParams({ postId: post.postId })}>
                                <h1 className="mt-10 mb-2 text-xl md:text-2xl font-extrabold hover:underline">
                                    {post.title}
                                </h1>
                            </a>
                            <div className='flex items-center'>
                                <p className="text-sm md:text-base font-bold text-gray-700 mr-5"> {post.author} </p>
                                <p className="text-sm text-gray-500">Published {post.createdAt}</p>
                            </div>
                            <p className="mt-4 mb-6">
                                {post.content.slice(0, 300) + "..."}
                            </p>
                            <div className='flex mb-10 mr-10'>
                                <button onClick={(event) => handleEdit(post.postId, event)} className='h-10 w-10 p-2 border-2 border-black rounded-full flex justify-center items-center bg-indigo-300 hover:bg-indigo-400 mr-4' type="button">
                                    <Image
                                        className="h-5 w-5"
                                        src="./assets/edit.svg"
                                        width={10}
                                        height={10}
                                        alt="Edit Icon"
                                    />
                                </button>
                                <button onClick={(event) => handleDelete(post.postId, event)} className='h-10 w-10 p-2 border-2 border-black rounded-full flex justify-center items-center bg-red-300 hover:bg-red-400' type="button">
                                    <Image
                                        className="h-5 w-5 "
                                        src="./assets/trash.svg"
                                        width={10}
                                        height={10}
                                        alt="Delete Icon"
                                    />
                                </button>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </section>

        </>

    );
};

export default all_posts;