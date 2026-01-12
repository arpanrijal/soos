import React from 'react';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-auto relative bottom-0">
      <div className="max-w-4xl mx-auto px-6 py-6 text-center">

        <div className="flex items-center justify-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-white" />
          <span className="text-lg font-semibold text-white">Quick_Task</span>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Simple tools for notes and file transfer.
        </p>

        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="text-gray-400">About</a>
          <a href="#" className="text-gray-400">Privacy</a>
          <a href="#" className="text-gray-400">Contact</a>
        </div>

        <p className="text-gray-500 text-xs mt-4">
          © 2025 Quick_Task — Built with React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
