import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 bg-blue-300 text-black'>
      <div className='text-lg font-bold'>MyApp</div>
      <div className='flex gap-4'>
        <Link to="/signin">Sign In</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;