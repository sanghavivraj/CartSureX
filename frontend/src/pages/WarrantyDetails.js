// WarrantyDetails.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const WarrantyDetails = () => {
    const { state } = useLocation();
    const warrantyCard = state?.warrantyCard || {};

    // Get duration directly from warrantyCard, matching ProductWarranty approach
    const duration = warrantyCard.warrantyDuration || warrantyCard.duration || 0;
    
    // Calculate end date based on purchase date and duration
    const endDate = warrantyCard.warrantyEndDate || 
                   moment(warrantyCard.purchaseDate).add(duration, 'years').toDate();

    if (!warrantyCard.warrantyId) {
        return (
            <div className="container mx-auto p-4">
                <p className="text-center">Warranty details not found</p>
                <Link to="/order" className="text-blue-600 hover:underline">
                    Back to orders
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-red-600 text-white p-4">
                    <h1 className="text-2xl font-bold">Warranty Certificate</h1>
                    <p className="text-blue-100">Warranty ID: {warrantyCard.warrantyId}</p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Product Information</h2>
                            <p><span className="font-medium">Name:</span> {warrantyCard.name || warrantyCard.productName}</p>
                            <p><span className="font-medium">Product ID:</span> {warrantyCard.productId}</p>
                            <p><span className="font-medium">Purchase Date:</span> {moment(warrantyCard.purchaseDate).format('LL')}</p>
                            <p><span className="font-medium">Price:</span> {displayINRCurrency(warrantyCard.price)}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Warranty Period</h2>
                            <p><span className="font-medium">Duration:</span> {duration} year{duration !== 1 ? 's' : ''}</p>
                            <p><span className="font-medium">Start Date:</span> {moment(warrantyCard.warrantyStartDate || warrantyCard.purchaseDate).format('LL')}</p>
                            <p><span className="font-medium">End Date:</span> {moment(endDate).format('LL')}</p>
                            <p className="mt-2">
                                <span className="font-medium">Status:</span> 
                                <span className={`ml-2 px-3 py-2 rounded text-xs ${
                                    new Date(endDate) > new Date() 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {new Date(endDate) > new Date() ? 'Active' : 'Expired'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Coverage Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">What's Covered:</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {warrantyCard.coverage?.manufacturingDefects && <li>Manufacturing Defects: {warrantyCard.coverage.manufacturingDefects}</li>}
                                    {warrantyCard.coverage?.breakdownOrMalfunction && <li>Breakdown/Malfunction: {warrantyCard.coverage.breakdownOrMalfunction}</li>}
                                    {warrantyCard.coverage?.specificParts && <li>Specific Parts: {warrantyCard.coverage.specificParts}</li>}
                                    {warrantyCard.coverage?.extendedWarranty && <li>Extended Warranty: {warrantyCard.coverage.extendedWarranty}</li>}
                                    {warrantyCard.coverage?.accidentalDamage && <li>Accidental Damage: {warrantyCard.coverage.accidentalDamage}</li>}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">What's Not Covered:</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {warrantyCard.coverage?.normalWearAndTear && <li>Normal Wear and Tear: {warrantyCard.coverage.normalWearAndTear}</li>}
                                    {warrantyCard.coverage?.misuseOrAbuse && <li>Misuse or Abuse: {warrantyCard.coverage.misuseOrAbuse}</li>}
                                    {warrantyCard.coverage?.unauthorizedRepairs && <li>Unauthorized Repairs: {warrantyCard.coverage.unauthorizedRepairs}</li>}
                                    {warrantyCard.coverage?.externalFactors && <li>External Factors: {warrantyCard.coverage.externalFactors}</li>}
                                    {warrantyCard.coverage?.specificConditions && <li>Specific Conditions: {warrantyCard.coverage.specificConditions}</li>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                        <p><span className="font-medium">Customer ID:</span> {warrantyCard.userId}</p>
                        <p><span className="font-medium">Email:</span> {warrantyCard.userEmail}</p>
                    </div>

                    <div className="mt-6">
                        <Link 
                            to="/order" 
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Back to Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarrantyDetails;