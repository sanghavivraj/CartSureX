
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import { toast } from 'react-toastify';

const AllWarranties = () => {
    const [warranties, setWarranties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sendingEmails, setSendingEmails] = useState({});

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const warrantyResponse = await fetch(SummaryApi.getAllWarranties.url, {
                method: SummaryApi.getAllWarranties.method,
                credentials: 'include'
            });
            const warrantyData = await warrantyResponse.json();

            const userResponse = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
            const userData = await userResponse.json();

            if (warrantyData.success && userData.success) {
                const usersMap = userData.data.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {});

                const mergedWarranties = warrantyData.data
                    .filter(warranty => warranty.warrantyId)
                    .map(warranty => ({
                        ...warranty,
                        userName: usersMap[warranty.userId]?.name || 'Unknown',
                        userEmail: usersMap[warranty.userId]?.email || '',
                        productName: warranty.productName || 'Product',
                        // Make sure emailSent status comes from the backend
                        emailSent: warranty.emailSent || false
                    }));

                setWarranties(mergedWarranties.filter(w => w.userEmail));
            } else {
                toast.error(warrantyData.message || userData.message || "Error fetching data");
            }
        } catch (error) {
            toast.error("Error fetching warranties or users");
        } finally {
            setLoading(false);
        }
    };

    const handleSendEmail = async (warrantyId, userEmail, userName, productName, endDate) => {
        if (!userEmail) {
            toast.error("Cannot send email - no user email available");
            return;
        }

        setSendingEmails(prev => ({ ...prev, [warrantyId]: true }));

        try {
            const response = await fetch(SummaryApi.updateWarranty.url, {
                method: SummaryApi.updateWarranty.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    warrantyId,
                    userEmail,
                    userName,
                    productName,
                    endDate
                })
            });

            const dataResponse = await response.json();

            if (!dataResponse.success) {
                toast.error(dataResponse.message || "Failed to send email");
            } else {
                // Update local state to reflect the email was sent
                setWarranties(prevWarranties =>
                    prevWarranties.map(warranty =>
                        warranty.warrantyId === warrantyId
                            ? { ...warranty, emailSent: true }
                            : warranty
                    )
                );
                toast.success("Email sent successfully");
            }
        } catch (error) {
            toast.error("Error sending warranty email");
        } finally {
            setSendingEmails(prev => ({ ...prev, [warrantyId]: false }));
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <div className='bg-white pb-4 p-4'>
            <div className='overflow-x-auto'>
                <table className='w-full border-collapse border border-black'>
                    <thead>
                        <tr className='bg-black text-white'>
                            <th className='border border-black p-2'>Sr.</th>
                            <th className='border border-black p-2'>Warranty ID</th>
                            <th className='border border-black p-2'>User Name</th>
                            <th className='border border-black p-2'>User Email</th>
                            <th className='border border-black p-2'>Product Name</th>
                            <th className='border border-black p-2'>End Date</th>
                            <th className='border border-black p-2'>Status</th>
                            <th className='border border-black p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warranties.map((warranty, index) => (
                            <tr key={warranty.warrantyId} className='hover:bg-gray-50'>
                                <td className='border border-black p-2'>{index + 1}</td>
                                <td className='border border-black p-2'>{warranty.warrantyId}</td>
                                <td className='border border-black p-2'>{warranty.userName}</td>
                                <td className='border border-black p-2'>{warranty.userEmail}</td>
                                <td className='border border-black p-2'>{warranty.productName}</td>
                                <td className='border border-black p-2'>{moment(warranty.endDate).format('LL')}</td>
                                <td className='border border-black p-2'>
                                    {warranty.emailSent ? 'Sent' : 'Pending'}
                                </td>
                                <td className='border border-black p-2'>
                                    <button
                                        className={`px-3 py-1 ${
                                            warranty.emailSent
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : sendingEmails[warranty.warrantyId]
                                                    ? 'bg-blue-300 cursor-wait'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                        } text-white transition-colors`}
                                        onClick={() => handleSendEmail(
                                            warranty.warrantyId,
                                            warranty.userEmail,
                                            warranty.userName,
                                            warranty.productName,
                                            warranty.endDate
                                        )}
                                        disabled={warranty.emailSent || sendingEmails[warranty.warrantyId] || !warranty.userEmail}
                                    >
                                        {warranty.emailSent
                                            ? 'Sent'
                                            : sendingEmails[warranty.warrantyId]
                                                ? 'Sending...'
                                                : 'Send Email'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && <p className='text-center py-4'>Loading warranties...</p>}
            {!loading && warranties.length === 0 && (
                <p className='text-center py-4'>No warranties available</p>
            )}
        </div>
    );
};

export default AllWarranties;