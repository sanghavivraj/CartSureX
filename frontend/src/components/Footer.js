import React, { useEffect } from 'react'
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp')
        }
      })
    })

    const targets = document.querySelectorAll('.footer-animate')
    targets.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-5')
      observer.observe(el)
    })

    return () => targets.forEach(el => observer.unobserve(el))
  }, [])

  return (
    <footer className=" bg-gray-900  border-t border-slate-200 shadow-inner mt-10 text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Column 1: Branding */}
        <div className="footer-animate flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-extrabold text-red-600 animate-pulse mb-1">CartSureX</h2>
          <p className="text-sm text-2xl italic text-white-600 mb-3">Trust and Secure</p>
          <p className="text-sm text-white-600">
            Smart shopping meets secure warranty storage. Shop confidently with CartSureX.
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4 text-xl">
            <FaTwitter className="hover:text-red-600 hover:scale-125 transition-all cursor-pointer" />
            <FaFacebookF className="hover:text-red-600 hover:scale-125 transition-all cursor-pointer" />
            <FaInstagram className="hover:text-red-600 hover:scale-125 transition-all cursor-pointer" />
            <FaLinkedin className="hover:text-red-600 hover:scale-125 transition-all cursor-pointer" />
            <FaGithub className="hover:text-red-600 hover:scale-125 transition-all cursor-pointer" />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-animate">
          <h2 className="text-lg font-semibold text-red-600 border-b-2 border-red-600 inline-block mb-3">Quick Links</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex text-1xl items-center text-white justify-center md:justify-start gap-2 hover:text-red-600 cursor-pointer transition-all">
              <i className="bi bi-arrow-right-short text-lg"></i> Home
            </li>
            <li className="flex text-1xl items-center text-white justify-center md:justify-start gap-2 hover:text-red-600 cursor-pointer transition-all">
              <i className="bi bi-arrow-right-short text-lg"></i> About
            </li>
            <li className="flex text-1xl items-center  text-white justify-center md:justify-start gap-2 hover:text-red-600 cursor-pointer transition-all">
              <i className="bi bi-arrow-right-short text-lg"></i> Contact
            </li>
          </ul>
        </div>

        {/* Column 3: Contact + Scroll */}
        <div className="footer-animate flex flex-col items-center md:items-start justify-between">
          <div>
            <h5 className="text-lg font-semibold text-red-600 border-b-2 border-red-600 inline-block mb-3">Contact</h5>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-center text-white gap-2 justify-center md:justify-start"><i className="bi bi-geo-alt-fill"></i> 123 Street, City, Country</li>
              <li className="flex items-center text-white gap-2 justify-center md:justify-start"><i className="bi bi-telephone-fill"></i> +91 9876543210</li>
              <li className="flex items-center text-white gap-2 justify-center md:justify-start"><i className="bi bi-envelope-fill"></i> support@cartsurex.com</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center text-white text-xxs text-gray-500 border-t  pt-4 pb-6 footer-animate">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-red-600">CartSureX</span> • Trust and Secure • All rights reserved. <span className="text-gray-400">Privacy | Terms</span>
      </div>

      {/* Animation CSS */}
      <style>{`
        .animate-fadeInUp {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: all 0.7s ease-in-out;
        }
      `}</style>
    </footer>
  )
}

export default Footer
