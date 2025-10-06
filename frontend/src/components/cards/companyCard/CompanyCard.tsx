import React from "react";

const CompanyCard: React.FC = () => (
    // Company Card 1 - Brandix Style
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">BR</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Brandix</h3>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">Apparel & Textile</span>
        </div>
        
        <p className="text-gray-600 text-sm text-center mb-6">
            Brandix is a global apparel solutions provider specializing in high-value clothing, lingerie, and accessories for leading brands worldwide.
        </p>
        
        <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-map-marker-alt text-purple-600 w-5"></i>
                <span>Colombo</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-users text-purple-600 w-5"></i>
                <span>50+ employees</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-briefcase text-purple-600 w-5"></i>
                <span>7 open positions</span>
            </div>
        </div>
        
        <div className="flex space-x-3">
            <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                <i className="fas fa-external-link-alt mr-2"></i>Website
            </button>
            <button className="flex-1 border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                View Jobs
            </button>
        </div>
    </div>
);

export default CompanyCard;
