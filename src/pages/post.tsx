import Navbar from "@/components/Navbar";
import { SS_API_URL } from "../../constants";
import React from "react";
import { PostProps } from "@/interfaces/PostProps";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getServerSideProps({ query: { postId } }: any) {
    const response = await fetch(`${SS_API_URL}/post?postId=${postId}`);
    const post: PostProps = await response.json();

    return {
        props: {
            post,
        },
    };
}

const Post = (props: { post: PostProps }) => {
    return (
        <>
            <Head>
                <title>Slightly Techie | {props.post.title}</title>
                <link rel="slightly techie icon" href="/slightlytechie.jpeg" />
            </Head>
            <Navbar />
            <div className="container flex flex-col mx-4 md:w-2/3 md:m-auto ">
                <h1 className="mt-10 mb-4 mx-5 text-3xl font-extrabold">
                    {props.post.title}
                </h1>
                <div className="mx-5">
                    <h1 className="font-bold text-gray-700">{props.post.author}</h1>
                    <p className="text-sm text-gray-500">Published {props.post.createdAt}</p>
                </div>
                <hr className="my-8 mx-1" />
                <p className="mx-5 mb-5">{props.post.content}</p>
                <hr className="my-8 mx-1" />
                <div className="mx-5 mb-20 flex items-center justify-between">
                    <h1 className="font-bold text-gray-700">{props.post.author}</h1>
                    <p className="text-sm text-gray-500">Published {props.post.createdAt}</p>
                </div>
            </div>
        </>
    )
}

export default Post;