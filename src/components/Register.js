import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

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
    const newUser = { id: Date.now(), ...formData };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully!');
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
        <h2 className='text-2xl mb-4'>Register</h2>
        <div className='mb-4'>
          <label className='block mb-2'>Username</label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;