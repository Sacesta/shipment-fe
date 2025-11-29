import React from 'react';

const ShipmentsPage = ({ onCreateShipment, onTrackShipment }) => {


  const shipments = [
    {
      awb: '123456789',
      orderId: 'OD-987654',
      courier: 'ShipRocket',
      pickupStatus: 'Pending Pickup',
      deliveryStatus: 'In Transit',
      pickupColor: 'bg-[#EFF6FF] text-[#1E40AF]',
      deliveryColor: 'bg-[#FFFBEB] text-[#B45309]'
    },
    {
      awb: '234567890',
      orderId: 'OD-876543',
      courier: 'BlueDart',
      pickupStatus: 'Scheduled',
      deliveryStatus: 'Delivered',
      pickupColor: 'bg-[#EFF6FF] text-[#1E40AF]',
      deliveryColor: 'bg-[#ECFDF5] text-[#065F46]'
    },
    {
      awb: '345678901',
      orderId: 'OD-765432',
      courier: 'Delhivery',
      pickupStatus: 'Picked Up',
      deliveryStatus: 'RTO Initiated',
      pickupColor: 'bg-gray-100 text-gray-800',
      deliveryColor: 'bg-[#FEF2F2] text-[#991B1B]'
    },
    {
      awb: '456789012',
      orderId: 'OD-654321',
      courier: 'Ecom Express',
      pickupStatus: 'Picked Up',
      deliveryStatus: 'In Transit',
      pickupColor: 'bg-gray-100 text-gray-800',
      deliveryColor: 'bg-[#FFFBEB] text-[#B45309]'
    }
  ];

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-col">
            <h1 className="text-[#1F2937] dark:text-white text-3xl font-black leading-tight tracking-[-0.03em]">All Shipments</h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-1">Manage, track, and download labels for all your shipments.</p>
          </div>
          <button 
            onClick={onCreateShipment}
            className="hidden md:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gradient-to-r from-[#818cf8] to-[#c084fc] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate">+ Create Shipment</span>
          </button>

        </div>
        
        {/* Main Container Card */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
          {/* SearchBar */}
          <div className="pb-4">
            <label className="flex flex-col min-w-40 h-12 w-full max-w-sm">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-gray-400 dark:text-gray-500 flex bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-y border-l border-gray-200 dark:border-gray-700">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input 
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#1F2937] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border-y border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-sm font-normal" 
                  placeholder="Search by AWB, Order ID..." 
                  value=""
                />
              </div>
            </label>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#1F2937] dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 font-medium" scope="col">AWB</th>
                  <th className="px-6 py-3 font-medium" scope="col">Order ID</th>
                  <th className="px-6 py-3 font-medium" scope="col">Courier</th>
                  <th className="px-6 py-3 font-medium" scope="col">Pickup Status</th>
                  <th className="px-6 py-3 font-medium" scope="col">Delivery Status</th>
                  <th className="px-6 py-3 font-medium text-center" scope="col">Label</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment, index) => (
                  <tr 
                    key={index} 
                    className="bg-white dark:bg-transparent border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => onTrackShipment && onTrackShipment(shipment)}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{shipment.awb}</td>

                    <td className="px-6 py-4">{shipment.orderId}</td>
                    <td className="px-6 py-4">{shipment.courier}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shipment.pickupColor}`}>
                        {shipment.pickupStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shipment.deliveryColor}`}>
                        {shipment.deliveryStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white" title="Download Label">
                        <span className="material-symbols-outlined text-xl">download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">1-4</span> of <span className="font-semibold text-gray-900 dark:text-white">100</span>
            </span>
            <div className="flex items-center space-x-1">
              <a className="flex size-8 items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </a>
              <a className="text-sm font-bold flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary dark:bg-primary/20 dark:text-white" href="#">1</a>
              <a className="text-sm font-normal flex size-8 items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">2</a>
              <a className="text-sm font-normal flex size-8 items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">3</a>
              <span className="text-sm font-normal flex size-8 items-center justify-center text-gray-500 dark:text-gray-400">...</span>
              <a className="text-sm font-normal flex size-8 items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">10</a>
              <a className="flex size-8 items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShipmentsPage;
