import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async (productId) => {
    const response = await fetch(`${SummaryApi.deleteProduct.url}/${productId}`, {
      method: SummaryApi.deleteProduct.method,
      credentials: 'include'
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      fetchdata(); // Refresh the product list
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage[0]} className='mx-auto object-fill h-full' alt={data.productName} />
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

        <div>
          <p className='font-semibold'>
            {displayINRCurrency(data.sellingPrice)}
          </p>

          <div className='flex justify-end gap-2'>
            {/* Edit Button */}
            <div
              className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>

            {/* Delete Button */}
            <div
              className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer'
              onClick={() => handleDeleteProduct(data._id)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;