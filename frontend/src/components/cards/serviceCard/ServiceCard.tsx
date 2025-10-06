import React from "react";

const ServiceCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <i className="fas fa-code text-2xl text-indigo-600"></i>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Web Development</h3>
      <div className="flex justify-center items-center mb-3">
        <div className="flex text-yellow-400">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <span className="text-gray-500 text-sm ml-2">(4.9)</span>
      </div>
    </div>

    <ul className="space-y-2 mb-6 text-sm text-gray-600">
      <li className="flex items-center">
        <i className="fas fa-check text-green-500 w-5"></i>
        <span>Responsive Design</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-check text-green-500 w-5"></i>
        <span>Modern Frameworks</span>
      </li>
      <li className="flex items-center">
        <i className="fas fa-check text-green-500 w-5"></i>
        <span>SEO Optimized</span>
      </li>
    </ul>

    <div className="text-center mb-6">
      <span className="text-3xl font-bold text-indigo-600">$299</span>
      <span className="text-gray-500">/project</span>
    </div>

    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
      Get Started
    </button>
  </div>
);

export default ServiceCard;
