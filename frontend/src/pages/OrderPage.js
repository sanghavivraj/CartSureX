import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";
import { fetchProductWarranty } from "./fetchProductWarranty";
import { toast } from "react-toastify";

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warrantyData, setWarrantyData] = useState({});

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: "include",
      });
      const responseData = await response.json();
      setData(responseData.data || []);

      // Fetch warranty details for all products in the order
      const warrantyPromises = responseData.data.flatMap(order => 
        order.productDetails.map(product => 
          fetchProductWarranty(product.productId)
        )
      );
      const warrantyResults = await Promise.all(warrantyPromises);
      
      // Create a mapping of productId to warranty data
      const warrantyMap = {};
      responseData.data.forEach(order => {
        order.productDetails.forEach((product, index) => {
          warrantyMap[product.productId] = warrantyResults.shift();
        });
      });
      
      setWarrantyData(warrantyMap);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {data.length === 0 && (
        <p className="text-center text-gray-500">No orders available</p>
      )}

      <div className="space-y-6">
        {data.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium text-lg">
                  Order Date: {moment(order.createdAt).format("LL")}
                </p>
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
              </div>
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <h3 className="font-medium">Order Status: <span className="font-semibold">{order.status || "Processing"}</span></h3>
              </div>
              <div className="text-lg font-semibold">
                Total: {displayINRCurrency(order.totalAmount)}
              </div>
            </div>

            <div className="space-y-4">
              {order.productDetails.map((product, index) => {
                const warranty = warrantyData[product.productId] || {};
                const duration = warranty.duration || 0;
                const endDate = moment(order.createdAt).add(duration, "years").format("LL");

                return (
                  <div
                    key={`${product.productId}-${index}`}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-grow">
                        <div className="font-medium text-lg">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-5 mt-1">
                          <div className="text-lg text-red-500">
                            {displayINRCurrency(product.price)}
                          </div>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                        <div className="mt-2">
                          {duration > 0 && (
                            <Link
                              to={`/warranty/${order._id}-${product.productId}`}
                              state={{
                                warrantyCard: {
                                  ...product,
                                  warrantyId: `${order._id}-${product.productId}`,
                                  warrantyDuration: duration,
                                  warrantyStartDate: order.createdAt,
                                  warrantyEndDate: endDate,
                                  userId: order.userId,
                                  userEmail: order.email,
                                  purchaseDate: order.createdAt,
                                  coverage: warranty.coverage || {},
                                  productName: product.name,
                                  productId: product.productId
                                },
                              }}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                              View Warranty Details
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <h3 className="font-medium mb-2">Payment Details</h3>
                <p>Method: {order.paymentDetails.payment_method_type?.[0]}</p>
                <p>Status: {order.paymentDetails.payment_status}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                {/* <h3 className="font-medium mb-2">Shipping Details</h3> */}
                {order.shipping_options?.map((shipping, i) => (
                  <div key={i}>
                    <p>
                      Shipping: {displayINRCurrency(shipping.shipping_amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;