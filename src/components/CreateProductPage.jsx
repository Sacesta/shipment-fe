import React, { useState } from 'react';

const CreateProductPage = ({ onBackToProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    stock: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Product data:', formData);
    // You can add API call or state management here
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={onBackToProducts}
            className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary"
          >
            Dashboard
          </button>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">/</span>
          <button 
            onClick={onBackToProducts}
            className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary"
          >
            Products
          </button>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">/</span>
          <span className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Add New</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Create New Product</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Fill in the details below to add a new product to your inventory.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#181830] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          {/* Section Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Product Details</h3>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="flex flex-col w-full">
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Product Name</p>
                <div className="relative flex w-full flex-1 items-center">
                  <span className="material-symbols-outlined absolute left-4 text-slate-400 dark:text-slate-500">label</span>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-12 pr-4 text-base font-normal leading-normal" 
                    placeholder="e.g., Premium Cotton T-Shirt" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>

            {/* SKU */}
            <div>
              <label className="flex flex-col w-full">
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">SKU (Stock Keeping Unit)</p>
                <div className="relative flex w-full flex-1 items-center">
                  <span className="material-symbols-outlined absolute left-4 text-slate-400 dark:text-slate-500">barcode_scanner</span>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-12 pr-4 text-base font-normal leading-normal" 
                    placeholder="e.g., PCT-BLK-L" 
                    value={formData.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>

            {/* Weight */}
            <div>
              <label className="flex flex-col w-full">
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Weight</p>
                <div className="relative flex w-full flex-1 items-center">
                  <span className="material-symbols-outlined absolute left-4 text-slate-400 dark:text-slate-500">scale</span>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-12 pr-4 text-base font-normal leading-normal" 
                    placeholder="0.00" 
                    type="number" 
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    required
                  />
                  <span className="absolute right-4 text-sm text-slate-500 dark:text-slate-400">kg</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Units in kilograms (kg).</p>
              </label>
            </div>

            {/* Dimensions */}
            <div className="md:col-span-2">
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Dimensions (cm)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex flex-col w-full">
                  <div className="relative flex w-full flex-1 items-center">
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal" 
                      placeholder="Length" 
                      type="number" 
                      value={formData.length}
                      onChange={(e) => handleInputChange('length', e.target.value)}
                      required
                    />
                  </div>
                </label>
                <label className="flex flex-col w-full">
                  <div className="relative flex w-full flex-1 items-center">
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal" 
                      placeholder="Width" 
                      type="number" 
                      value={formData.width}
                      onChange={(e) => handleInputChange('width', e.target.value)}
                      required
                    />
                  </div>
                </label>
                <label className="flex flex-col w-full">
                  <div className="relative flex w-full flex-1 items-center">
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal" 
                      placeholder="Height" 
                      type="number" 
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      required
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Initial Stock */}
            <div>
              <label className="flex flex-col w-full">
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2">Initial Stock Level</p>
                <div className="relative flex w-full flex-1 items-center">
                  <span className="material-symbols-outlined absolute left-4 text-slate-400 dark:text-slate-500">inventory</span>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-primary h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-12 pr-4 text-base font-normal leading-normal" 
                    placeholder="e.g., 100" 
                    type="number" 
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>

            {/* Form Actions */}
            <div className="md:col-span-2 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end items-center gap-4">
              <button 
                type="button"
                onClick={onBackToProducts}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <span className="truncate">Cancel</span>
              </button>
              <button 
                type="submit"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
              >
                <span className="truncate">Add Product</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateProductPage;
