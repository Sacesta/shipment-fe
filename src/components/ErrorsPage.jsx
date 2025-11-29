import React from 'react';

const ErrorsPage = () => {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        {/* PageHeading Component */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">API & Shipping Errors</p>
        </div>
        
        {/* Main Container Card */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          {/* Toolbar & Chips Component */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 flex gap-2 overflow-x-auto pb-2">
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary text-white pl-4 pr-4">
                <p className="text-sm font-medium leading-normal">All</p>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 pl-4 pr-4">
                <p className="text-sm font-medium leading-normal">Missing Weight</p>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 pl-4 pr-4">
                <p className="text-sm font-medium leading-normal">Wrong Pincode</p>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 pl-4 pr-4">
                <p className="text-sm font-medium leading-normal">Shiprocket Error</p>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 pl-4 pr-4">
                <p className="text-sm font-medium leading-normal">API Failure</p>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <span className="material-symbols-outlined">swap_vert</span>
              </button>
            </div>
          </div>
          
          {/* Table Component */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Error</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">#OD786543</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Anshuman Singh, New Delhi</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Shipment weight is required but not provided.</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700/30 dark:text-red-300">Missing Weight</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 min ago</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-sm font-medium text-primary hover:underline">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">#OD786512</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Riya Sharma, Mumbai</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">The provided pincode 400001 is not serviceable.</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700/30 dark:text-red-300">Invalid Pincode</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-sm font-medium text-primary hover:underline">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">#OD786499</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Prakash Kumar, Bengaluru</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Courier partner API returned a 500 server error.</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700/30 dark:text-red-300">Shiprocket Error</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-sm font-medium text-primary hover:underline">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">#OD786488</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Meera Iyer, Chennai</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Authentication token expired. Please re-authenticate.</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700/30 dark:text-red-300">API Failure</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Oct 26, 2023</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-sm font-medium text-primary hover:underline">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorsPage;
