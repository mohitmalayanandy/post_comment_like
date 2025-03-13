import React, { useState, useEffect } from 'react';

const Posts = () => {
    const [post, setPost] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        image: '',
        location: '',
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('posts')) || [];
        if (storedData && storedData.length > 0) {
            setPost(storedData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        if (isEditMode) {
            const updatedPosts = posts.map((p) =>
                p.id === currentPostId ? { ...p, ...postData } : p
            );
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            setPost(updatedPosts);
        } else {
            const newPost = { id: Date.now(), ...postData };
            posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));
            setPost(posts);
        }
        setPostData({ title: '', content: '', image: '', location: '' });
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentPostId(null);
    };

    const handleEdit = (post) => {
        setPostData(post);
        setIsEditMode(true);
        setCurrentPostId(post.id);
        setIsModalOpen(true);
    };

    const handleDelete = (postId) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = posts.filter((post) => post.id !== postId);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setPost(updatedPosts);
    };

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-2xl font-bold mb-4 text-center'>All Posts</h1>
            <button onClick={() => setIsModalOpen(true)} className='w-40 bg-blue-500 text-white p-2 rounded'>
                Add Post
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
                            <h2 className='text-2xl font-bold mb-4 text-center'>{isEditMode ? 'Edit Post' : 'Add New Post'}</h2>
                            <div className='mb-4'>
                                <input
                                    type='text'
                                    name='title'
                                    placeholder='Enter Your Title'
                                    value={postData.title}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type='text'
                                    name='content'
                                    placeholder='Enter Your Post Content'
                                    value={postData.content}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type='url'
                                    name='image'
                                    placeholder='Enter the image url'
                                    value={postData.image}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type='text'
                                    name='location'
                                    placeholder='Enter Your Location'
                                    value={postData.location}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded'
                                    required
                                />
                            </div>
                            <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
                                {isEditMode ? 'Update Post' : 'Post It'}
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="w-full bg-orange-500 text-white p-2 rounded">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {post.map((post) => (
                    <div key={post.id} className="p-6 bg-white text-black rounded-xl shadow-xl">
                        <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
                        <p>{post.content}</p>
                        <p className='text-gray-400'>{post.location}</p>
                        <img src={post.image} alt="" className="w-full rounded-lg shadow-md" />
                        <button onClick={() => handleEdit(post)} className='w-20 bg-green-500 text-white p-2 rounded m-2'>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(post.id)} className='w-20 bg-red-500 text-white p-2 rounded m-2'>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;