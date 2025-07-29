import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";

const orderStatuses = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const AllOrder = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: "include",
    });

    const responseData = await response.json();
    setData(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(SummaryApi.updateOrderStatus.url(orderId), {
        method: SummaryApi.updateOrderStatus.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const responseData = await response.json();

      setData((prevData) =>
        prevData.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(responseData.message || "Order status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.message || "Failed to update order status");
    }
  };

  return (
    <div className="h-[calc(100vh-190px)] overflow-y-scroll">
      {!data[0] && <p>No Order available</p>}

      <div className="p-4 w-full">
        {data.map((item, index) => {
          if (item.userName === 'Unknown') return null; // ✅ Skip unknown users

          return (
            <div key={item.userId._id + index}>
              <p className="font-medium text-lg">{moment(item.createdAt).format("LL")}</p>

              {/* 👇 User Info */}
              <p className="font-medium">User Name: {item.userName}</p>
              <p className="font-medium">User Email: {item.email}</p>

              <div className="border rounded p-2">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-1">
                    {item?.productDetails.map((product, index) => (
                      <div key={product.productId + index} className="flex gap-3 bg-slate-100">
                        <div>
                          <div className="font-medium text-lg text-ellipsis line-clamp-1">
                            {product.name}
                          </div>
                          <div className="flex items-center gap-5 mt-1">
                            <div className="text-lg text-red-500">
                              {displayINRCurrency(product.price)}
                            </div>
                            <p>Quantity : {product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-medium">Payment Details:</div>
                      <p className="ml-1">
                        Payment method: {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className="ml-1">Payment Status: {item.paymentDetails.payment_status}</p>
                    </div>
                    <div>
                      <div className="text-lg font-medium">Shipping Details:</div>
                      {item.shipping_options.map((shipping, index) => (
                        <div key={shipping.shipping_rate} className="ml-1">
                          Shipping Amount: {shipping.shipping_amount}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-lg font-semibold">Order Status:</label>
                  <select
                    className="ml-2 border p-2 rounded"
                    value={item.status || "Processing"}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="font-semibold ml-auto w-fit lg:text-lg">
                  Total Amount: {displayINRCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrder;
