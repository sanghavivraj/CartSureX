import React from 'react';

const TermsOfUse = () => {
  return (
    <div className='container mx-auto p-4 max-h-[70vh]'>
      <h1 className='text-3xl font-bold mb-6'>Terms of Use</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <p className='text-lg mb-4'>
          Welcome to <strong>CartSureX</strong>. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
        </p>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Acceptance of Terms</h2>
        <p className='text-lg mb-4'>
          By using CartSureX, you agree to these Terms of Use. If you do not agree, please do not use our platform. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of the updated terms.
        </p>
        <h2 className='text-xl font-semibold mt-6 mb-4'>User Responsibilities</h2>
        <p className='text-lg mb-4'>
          As a user of CartSureX, you agree to:
        </p>
        <ul className='list-disc list-inside text-lg mb-4'>
          <li>Provide accurate and complete information during registration.</li>
          <li>Maintain the confidentiality of your account credentials.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
        </ul>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Prohibited Activities</h2>
        <p className='text-lg mb-4'>
          You may not use CartSureX for any illegal or unauthorized purpose. Prohibited activities include:
        </p>
        <ul className='list-disc list-inside text-lg mb-4'>
          <li>Attempting to gain unauthorized access to our systems or data.</li>
          <li>Engaging in fraudulent activities, such as fake reviews or transactions.</li>
          <li>Uploading malicious content or disrupting the platform's functionality.</li>
        </ul>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Limitation of Liability</h2>
        <p className='text-lg mb-4'>
          CartSureX shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our platform. This includes, but is not limited to, loss of data, profits, or business opportunities.
        </p>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Payment and Refunds</h2>
        <p className='text-lg mb-4'>
          All payments are processed securely through third-party gateways like Razorpay and Stripe. Refunds are subject to our <strong>Refund Policy</strong>, which can be found on our platform.
        </p>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Governing Law</h2>
        <p className='text-lg mb-4'>
          These Terms of Use are governed by the laws of the jurisdiction in which CartSureX operates. Any disputes arising from your use of the platform will be resolved in accordance with these laws.
        </p>
        <p className='text-lg mb-4'>
          By using CartSureX, you agree to these Terms of Use. If you have any questions, please contact us at <strong>support@cartsurex.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;