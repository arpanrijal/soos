import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Nav_footer/Navbar';
import Footer from '../Nav_footer/Footer';

const Notfoundpage = () => {
  return (
    <>
    <NavBar />
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-gray-600">The page you are looking for does not exist.</p>

      <Link to="/">
        <button className="px-4 py-2 border rounded-md">
          Go to homepage
        </button>
      </Link>
    </div>
    <Footer />
    </>
  );
};

export default Notfoundpage;
