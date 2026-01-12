import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <>
            <div className="w-full bg-[#02072c] shadow-[0_0_20px_rgba(0,0,0,0.15)]">
                <div className="flex justify-between items-center px-10 py-4 text-white">
                    <div className="text-xl font-semibold tracking-wide cursor-grab">
                        Quick_Task
                    </div>

                    <div className="hidden md:flex space-x-8 font-medium">
                        <Link to={'/'} className="hover:underline h-[100%]">
                            Home
                        </Link>
                        <Link to={'/file-transfer'} className="hover:underline">
                            Files Transfer
                        </Link>
                        <Link to={'/about'} className="hover:underline">
                            About
                        </Link>
                        <Link to={'/contact'} className="hover:underline">
                            Contact
                        </Link>
                    </div>

                    <button className="md:hidden p-2 border border-white rounded hover:bg-white hover:text-[#0077ff] transition">
                        ☰
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavBar;
