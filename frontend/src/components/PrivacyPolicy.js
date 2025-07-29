import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto p-4 max-h-[70vh]'>
      <h1 className='text-3xl font-bold mb-6'>Privacy Policy</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <p className='text-lg mb-4'>
          At <strong>CartSureX</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform. By accessing or using CartSureX, you agree to the terms outlined in this policy.
        </p>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Information We Collect</h2>
        <p className='text-lg mb-4'>
          We collect the following types of information to provide and improve our services:
        </p>
        <ul className='list-disc list-inside text-lg mb-4'>
          <li><strong>Personal Information</strong>: Name, email address, phone number, and payment details.</li>
          <li><strong>Usage Data</strong>: Information about how you interact with our platform, such as browsing history and search queries.</li>
          <li><strong>Warranty Information</strong>: Details of your product warranties, including expiration dates and terms.</li>
        </ul>
        <h2 className='text-xl font-semibold mt-6 mb-4'>How We Use Your Information</h2>
        <p className='text-lg mb-4'>
          Your information is used for the following purposes:
        </p>
        <ul className='list-disc list-inside text-lg mb-4'>
          <li>To process orders and provide customer support.</li>
          <li>To send you important updates, such as order confirmations and warranty expiration reminders.</li>
          <li>To improve our platform and personalize your shopping experience.</li>
        </ul>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Data Security</h2>
        <p className='text-lg mb-4'>
          We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse. This includes:
        </p>
        <ul className='list-disc list-inside text-lg mb-4'>
          <li><strong>SSL Encryption</strong>: All transactions are secured using SSL encryption.</li>
          <li><strong>Firebase Authentication</strong>: Secure login and registration processes.</li>
          <li><strong>Payment Security</strong>: Payment data is transmitted directly to third-party gateways (e.g., Razorpay/Stripe) without being stored on our platform.</li>
        </ul>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Your Rights</h2>
        <p className='text-lg mb-4'>
          You have the right to access, update, or delete your personal information at any time. If you have any questions or concerns about your data, please contact us at <strong>support@cartsurex.com</strong>.
        </p>
        <p className='text-lg mb-4'>
          By using CartSureX, you agree to the terms outlined in this Privacy Policy. We may update this policy from time to time, so please review it regularly.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;