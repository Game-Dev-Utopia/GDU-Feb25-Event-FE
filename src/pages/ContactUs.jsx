import React from 'react';

const ContactUs = () => {
  return (
    <div className="p-6 bg-gray-100 text-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-sm text-gray-500 text-center mb-6">Last updated on 25-01-2025 12:41:23</p>
      <p className="mb-4">You may contact us using the information below:</p>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="mb-2"><span className="font-semibold">Merchant Legal Entity Name:</span> GAMEDEVUTOPIA</p>
        <p className="mb-2"><span className="font-semibold">Registered Address:</span> GameDevUtopia, SCTR's Pune Institute of Computer Technology, Pune, Maharashtra, PIN: 411043</p>
        <p className="mb-2"><span className="font-semibold">Operational Address:</span> GameDevUtopia, Pune Institute of Computer Technology, Dhankawadi, Pune, Pune, Maharashtra, PIN: 411043</p>
        <p className="mb-2"><span className="font-semibold">Telephone No:</span> 7218586049</p>
        <p><span className="font-semibold">E-Mail ID:</span> <a href="mailto:gamedevutopia@gmail.com" className="text-blue-600 underline">gamedevutopia@gmail.com</a></p>
      </div>
    </div>
  );
};

export default ContactUs;
