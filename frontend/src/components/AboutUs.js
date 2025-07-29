import React from 'react';

const AboutUs = () => {
  return (
    <div className='container mx-auto p-4 max-h-[70vh]'>
      <h1 className='text-3xl font-bold mb-6'>About Us</h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <p className='text-lg mb-4'>
          Welcome to <strong>CartSureX</strong>, an advanced e-commerce platform designed to revolutionize your online shopping experience. Built using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS), CartSureX offers a seamless and secure shopping experience with a unique focus on <strong>Digital Warranty Card Storage</strong>.
        </p>
        <p className='text-lg mb-4'>
          Our mission is to simplify the shopping process while providing value-added services that set us apart from traditional e-commerce platforms. With features like secure authentication, real-time order tracking, and automated warranty expiration notifications, CartSureX ensures that your shopping experience is both convenient and reliable.
        </p>
        <p className='text-lg mb-4'>
          At CartSureX, we prioritize user satisfaction and security. Our platform integrates with trusted third-party services like <strong>Firebase</strong> for authentication and <strong>Razorpay/Stripe</strong> for secure payment processing. Whether you're browsing products, managing your orders, or tracking warranties, CartSureX is here to make your life easier.
        </p>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Key Features</h2>
        <ul className='list-disc list-inside text-lg mb-4'>
          <li><strong>Digital Warranty Card Storage</strong>: Store and manage warranty details for all your purchases in one place.</li>
          <li><strong>Automated Notifications</strong>: Receive timely reminders before your warranties expire.</li>
          <li><strong>Secure Payments</strong>: Process transactions securely using multiple payment gateways.</li>
          <li><strong>Admin Dashboard</strong>: Manage products, orders, and users with ease.</li>
        </ul>
        <p className='text-lg mb-4'>
          Thank you for choosing CartSureX. We are committed to delivering a platform that not only meets but exceeds your expectations. Happy shopping!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;