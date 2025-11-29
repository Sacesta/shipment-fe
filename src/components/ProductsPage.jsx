import React, { useState } from 'react';

const ProductsPage = ({ onCreateProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      name: 'Classic Blue T-Shirt',
      sku: 'SR-TS-BL-M',
      weight: '0.2',
      dimensions: '30x20x2',
      stock: 250,
      stockColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    },
    {
      name: 'Branded White Mug',
      sku: 'SR-MG-WH-11',
      weight: '0.35',
      dimensions: '12x10x10',
      stock: 150,
      stockColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    },
    {
      name: 'Grey Hoodie',
      sku: 'SR-HD-GR-L',
      weight: '0.5',
      dimensions: '40x30x5',
      stock: 80,
      stockColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    },
    {
      name: 'Black Baseball Cap',
      sku: 'SR-CP-BK-OS',
      weight: '0.1',
      dimensions: '20x20x12',
      stock: 500,
      stockColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    },
    {
      name: 'Red Socks (3-Pack)',
      sku: 'SR-SK-RD-3PK',
      weight: '0.08',
      dimensions: '15x10x3',
      stock: 15,
      stockColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 p-8">
      <div className="flex max-w-7xl mx-auto flex-col gap-6">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Product Inventory</h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Add, manage, and track your product stock levels.</p>
          </div>
          <button 
            onClick={onCreateProduct}
            className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-11 px-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-shadow"
          >
           
            <span className="truncate">Add New Product</span>
          </button>
        </div>

        {/* SearchBar */}
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">search</span>
          <input 
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-12 text-base font-normal leading-normal" 
            placeholder="Search by product name or SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table Container Card */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-blue-500">info</span>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Stock is automatically deducted when a shipment is created.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wider">Dimensions (cm)</th>
                  <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wider">Stock Level</th>
                  <th className="px-6 py-3 text-left text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.dimensions}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${product.stockColor}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-primary hover:text-primary/80 dark:text-primary-400 dark:hover:text-primary-300 p-1 rounded-full hover:bg-primary/10">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                      </button>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-500/10">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">97</span> results</p>
            <div className="flex items-center">
              <a className="flex size-9 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400" href="#">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
              </a>
              <a className="text-sm font-bold flex size-9 items-center justify-center text-white rounded-md bg-primary" href="#">1</a>
              <a className="text-sm font-medium flex size-9 items-center justify-center text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">2</a>
              <a className="text-sm font-medium flex size-9 items-center justify-center text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">3</a>
              <span className="text-sm font-medium flex size-9 items-center justify-center text-gray-500 dark:text-gray-400 rounded-md" href="#">...</span>
              <a className="text-sm font-medium flex size-9 items-center justify-center text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">8</a>
              <a className="text-sm font-medium flex size-9 items-center justify-center text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">9</a>
              <a className="text-sm font-medium flex size-9 items-center justify-center text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" href="#">10</a>
              <a className="flex size-9 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400" href="#">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
