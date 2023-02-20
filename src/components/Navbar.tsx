import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps } from 'next';



const Navbar = () => {

    return (
        <nav className='z-50 h-24 relative border-b-2 border-black bg-green-200'>
            <div className='container mx-auto px-4 flex justify-between items-center h-full'>
                <Link className="text-lg md:text-2xl font-black" href={"/all_posts"}>SlightlyTechie</Link>
                <div className='flex items-center'>
                    <a href="/all_posts" className=' font-bold mr-3 md:mr-10 hover:underline'>Posts</a>
                    <a href="/create" className='px-6 py-3 text-sm font-bold text-black border-2 border-black bg-indigo-300 rounded-full hover:bg-indigo-400'>
                        Create
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

