import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.email === formData.email && user.password === formData.password);
        if (user) {
            navigate('/posts');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
                <h2 className='text-2xl mb-4'>Sign In</h2>
                <div className='mb-4'>
                    <label className='block mb-2'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                        required
                    />
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Signin;