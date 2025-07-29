import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SummaryApi from "../common";

const ProductWarranty = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      const dataResponse = await response.json();
      setProduct(dataResponse?.data);
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="container mx-auto p-4">Loading warranty details...</div>;
  if (!product) return <div className="container mx-auto p-4">Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Warranty Details</h1>
      <h2 className="text-xl mb-2">{product.productName}</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Warranty Period: {product.duration || 0} year{product.duration !== 1 ? 's' : ''}
        </h3>
        
        <h4 className="font-medium text-gray-800 mb-2">Coverage Includes:</h4>
        <ul className="list-disc pl-5 space-y-2">
          {product.coverage.manufacturingDefects && <li>Manufacturing Defects: {product.coverage.manufacturingDefects}</li>}
          {product.coverage.breakdownOrMalfunction && <li>Breakdown/Malfunction: {product.coverage.breakdownOrMalfunction}</li>}
          {product.coverage.specificParts && <li>Specific Parts: {product.coverage.specificParts}</li>}
          {product.coverage.extendedWarranty && <li>Extended Warranty: {product.coverage.extendedWarranty}</li>}
          {product.coverage.accidentalDamage && <li>Accidental Damage: {product.coverage.accidentalDamage}</li>}
        </ul>

        <h4 className="font-medium text-gray-800 mt-4 mb-2">What's Not Covered:</h4>
        <ul className="list-disc pl-5 space-y-2">
          {product.coverage.normalWearAndTear && <li>Normal Wear and Tear: {product.coverage.normalWearAndTear}</li>}
          {product.coverage.misuseOrAbuse && <li>Misuse or Abuse: {product.coverage.misuseOrAbuse}</li>}
          {product.coverage.unauthorizedRepairs && <li>Unauthorized Repairs: {product.coverage.unauthorizedRepairs}</li>}
          {product.coverage.externalFactors && <li>External Factors: {product.coverage.externalFactors}</li>}
          {product.coverage.specificConditions && <li>Specific Conditions: {product.coverage.specificConditions}</li>}
        </ul>

        <div className="mt-6">
          <Link to={`/product/${id}`} className="text-blue-600 hover:underline">
            ← Back to product details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductWarranty;