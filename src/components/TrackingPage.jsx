import React from 'react';
import { Card, Timeline, Progress } from 'antd';
import { CheckCircleOutlined, TruckOutlined, ShopOutlined, CarOutlined, CalendarOutlined } from '@ant-design/icons';

const TrackingPage = ({ onBackToShipments, shipment }) => {

  const timelineItems = [
    {
      color: 'green',
      dot: <CheckCircleOutlined />,
      children: (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-600 shadow-sm">
          <p className="font-bold text-slate-900 dark:text-white">Delivered</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Oct 26, 2023, 02:45 PM | Los Angeles, USA</p>
        </div>
      ),
    },
    {
      color: 'blue',
      dot: <TruckOutlined />,
      children: (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="font-bold text-slate-900 dark:text-white">Out for Delivery</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Oct 26, 2023, 09:15 AM | Los Angeles, USA</p>
        </div>
      ),
    },
    {
      color: 'blue',
      dot: <ShopOutlined />,
      children: (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="font-bold text-slate-900 dark:text-white">Arrived at Hub</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Oct 25, 2023, 11:30 PM | Chicago, USA</p>
        </div>
      ),
    },
    {
      color: 'blue',
      dot: <CarOutlined />,
      children: (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="font-bold text-slate-900 dark:text-white">In Transit</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Oct 24, 2023, 08:00 AM | New York, USA</p>
        </div>
      ),
    },
    {
      color: 'blue',
      // dot: <BoxOutlined />,
      children: (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="font-bold text-slate-900 dark:text-white">Picked Up</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Oct 23, 2023, 04:20 PM | New York, USA</p>
        </div>
      ),
    },
    {
      color: 'blue',
      dot: <CalendarOutlined />,
      children: (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="font-bold text-slate-900 dark:text-white">Pickup Scheduled</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Oct 23, 2023, 10:00 AM | New York, USA</p>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shipment Tracking</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your shipment status in real-time.</p>
      </div>

      {/* Header Card */}
      <Card className="mb-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Order ID: #SR123456789</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">AWB: 1234567890 | Carrier: Shiprocket X</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Estimated Delivery Date: October 26, 2023</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Shipment Progress</p>
            <p className="text-sm font-medium text-primary dark:text-primary">Delivered</p>
          </div>
          <Progress 
            percent={100} 
            strokeColor={{
              '0%': '#818cf8',
              '100%': '#c084fc',
            }}
            showInfo={false}
          />
        </div>
      </Card>

      {/* Timeline */}
      <Card 
        title="Shipment Timeline" 
        className="shadow-sm border border-slate-200 dark:border-slate-800"
      >
        <Timeline
          items={timelineItems}
          className="custom-timeline"
        />
      </Card>
    </div>
  );
};

export default TrackingPage;
