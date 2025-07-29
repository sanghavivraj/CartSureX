// utils/fetchProductWarranty.js
import SummaryApi from "../common";

export const fetchProductWarranty = async (productId) => {
  try {
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const dataResponse = await response.json();
    return {
      duration: dataResponse?.data?.duration || 0,
      coverage: dataResponse?.data?.coverage || {}
    };
  } catch (error) {
    console.error("Error fetching product warranty:", error);
    return {
      duration: 0,
      coverage: {}
    };
  }
};