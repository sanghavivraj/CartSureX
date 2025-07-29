import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import SelectionModal from '../components/SelectionModal';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);
    const navigate = useNavigate();
    const [showSelectionModal, setShowSelectionModal] = useState(false);
    const [user, setUser] = useState(null);

    // Fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setUser(dataResponse.data);
            }
        } catch (error) {
            toast.error("Failed to fetch user details");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch cart items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchUserDetails();
    }, []);

    const increaseQty = async (id, qty) => {
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty + 1,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };

    const decraseQty = async (id, qty) => {
        if (qty <= 1) return;

        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
                toast.success("Product removed from cart");
            }
        } catch (error) {
            toast.error("Failed to remove product");
        }
    };

    const handleProceedToCheckout = () => {
        if (data.length === 0) {
            toast.error("Your cart is empty");
            return;
        }
        setShowSelectionModal(true);
    };

    const handleAddressSelect = async (address) => {
        try {
            const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
            const response = await fetch(SummaryApi.payment.url, {
                method: SummaryApi.payment.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    cartItems: data,
                    shippingAddress: address,
                    success_url: `${window.location.origin}/order?success=true`,
                    cancel_url: `${window.location.origin}/cart`
                })
            });

            const responseData = await response.json();

            if (responseData.error) {
                throw new Error(responseData.message);
            }

            if (responseData.url) {
                window.location.href = responseData.url;
            } else if (responseData.id) {
                const stripe = await stripePromise;
                await stripe.redirectToCheckout({
                    sessionId: responseData.id
                });
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(`Payment failed: ${error.message}`);
        } finally {
            setShowSelectionModal(false);
        }
    };

    const totalQty = data.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = data.reduce((total, item) => total + (item.quantity * (item?.productId?.sellingPrice || 0)), 0);

    return (
        <div className='container mx-auto p-4'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <div className='bg-white py-5 rounded-lg shadow'>
                        <p>Your cart is empty</p>
                        <button 
                            onClick={() => navigate('/')}
                            className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>

            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Product List */}
                <div className='lg:w-2/3'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={index} className='w-full bg-gray-100 h-32 my-2 border border-gray-200 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div key={product._id} className='w-full bg-white my-2 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between'>
                                <div className='flex items-center gap-4 mb-4 sm:mb-0'>
                                    <div className='w-20 h-20 bg-gray-100 rounded-lg overflow-hidden'>
                                        <img
                                            src={product?.productId?.productImage?.[0] || '/placeholder-product.png'}
                                            className='w-full h-full object-cover'
                                            alt={product?.productId?.productName}
                                        />
                                    </div>
                                    <div>
                                        <h2 className='text-lg font-semibold'>{product?.productId?.productName}</h2>
                                        <p className='text-sm text-gray-500'>{product?.productId?.category}</p>
                                        <p className='text-md font-medium mt-1'>
                                            {displayINRCurrency(product?.productId?.sellingPrice || 0)} each
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <button
                                            className='w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100'
                                            onClick={() => decraseQty(product._id, product.quantity)}
                                            disabled={product.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className='w-8 text-center'>{product.quantity}</span>
                                        <button
                                            className='w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100'
                                            onClick={() => increaseQty(product._id, product.quantity)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className='text-lg font-semibold w-24 text-right'>
                                        {displayINRCurrency((product?.productId?.sellingPrice || 0) * product.quantity)}
                                    </p>
                                    <button
                                        className='text-gray-500 hover:text-red-500'
                                        onClick={() => deleteCartProduct(product._id)}
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Summary */}
                <div className='lg:w-1/3'>
                    <div className='bg-white border border-gray-200 rounded-lg p-6 sticky top-4'>
                        <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
                        <div className='space-y-3'>
                            <div className='flex justify-between'>
                                <p className='text-gray-600'>Subtotal ({totalQty} items)</p>
                                <p className='font-semibold'>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-600'>Shipping</p>
                                <p className='font-semibold'>{displayINRCurrency(0)}</p>
                            </div>
                            <div className='flex justify-between border-t border-gray-200 pt-3'>
                                <p className='text-lg font-bold'>Total</p>
                                <p className='text-lg font-bold'>{displayINRCurrency(totalPrice)}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleProceedToCheckout}
                            disabled={data.length === 0 || loading}
                            className={`w-full mt-6 py-3 rounded-lg text-white font-medium ${data.length === 0 ? 'bg-red-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            {loading ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Address Selection Modal */}
            {showSelectionModal && (
                <SelectionModal 
                    onClose={() => setShowSelectionModal(false)}
                    userId={user?._id}
                    onAddressSelect={handleAddressSelect}
                />
            )}
        </div>
    );
};

export default Cart;