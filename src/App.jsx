import React, { useState } from 'react';
import SignInPage from './components/SignIn';
import DashboardPage from './components/Dashboard';
import CreateShipmentPage from './components/CreateShipment';
import CourierModal from './components/CourierModal';
import AppLayout from './components/AppLayout';
import ProductsPage from './components/ProductsPage';
import CreateProductPage from './components/CreateProductPage';
import ShipmentsPage from './components/ShipmentsPage';
import TrackingPage from './components/TrackingPage';
import ErrorsPage from './components/ErrorsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('signin');
  const [collapsed, setCollapsed] = useState(false);
  const [showCourierModal, setShowCourierModal] = useState(false);

  const handleSignIn = () => {
    setCurrentPage('dashboard');
  };

  const handleCreateShipment = () => {
    setCurrentPage('create-shipment');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleBackToShipments = () => {
    setCurrentPage('shipments');
  };

  const handleShowCourierModal = () => {
    setShowCourierModal(true);
  };

  const handleCourierModalConfirm = () => {
    setShowCourierModal(false);
    setCurrentPage('shipments');
  };

  const handleCourierModalCancel = () => {
    setShowCourierModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateProduct = () => {
    setCurrentPage('create-product');
  };

  const handleBackToProducts = () => {
    setCurrentPage('products');
  };

  const handleTrackShipment = (shipment) => {
    setCurrentPage('tracking');
  };

  const handleShowErrors = () => {
    setCurrentPage('errors');
  };

  // Render based on current page
  if (currentPage === 'signin') {
    return <SignInPage onSignIn={handleSignIn} />;
  }

  return (
    <AppLayout 
      currentPage={currentPage} 
      onPageChange={handlePageChange}
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      {currentPage === 'dashboard' && (
        <DashboardPage onCreateShipment={handleCreateShipment} />
      )}
      {currentPage === 'create-shipment' && (
        <CreateShipmentPage 
          onBackToShipments={handleBackToShipments}
          onShowCourierModal={handleShowCourierModal}
        />
      )}
      {currentPage === 'products' && (
        <ProductsPage onCreateProduct={handleCreateProduct} />
      )}
      {currentPage === 'create-product' && (
        <CreateProductPage onBackToProducts={handleBackToProducts} />
      )}
      {currentPage === 'shipments' && (
        <ShipmentsPage 
          onCreateShipment={handleCreateShipment}
          onTrackShipment={handleTrackShipment}
        />
      )}
      {currentPage === 'tracking' && (
        <TrackingPage 
          onBackToShipments={handleBackToShipments}
        />
      )}
      {currentPage === 'errors' && (
        <ErrorsPage />
      )}
      <CourierModal 
        open={showCourierModal}
        onCancel={handleCourierModalCancel}
        onConfirm={handleCourierModalConfirm}
      />
    </AppLayout>
  );
};

export default App;
