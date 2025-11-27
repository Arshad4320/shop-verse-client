import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">ShopVerse</h2>
          <p className="text-sm">
            Your one-stop online store for fashion, gadgets, shoes, and more.
            High-quality products with fast delivery and excellent support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-white">
                Returns
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-white">
                Shipping
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">123 Street Name, City, Country</p>
          <p className="text-sm">Email: support@shopverse.com</p>
          <p className="text-sm mb-4">Phone: +880 123 456 789</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-gray-400 text-center text-sm py-4 mt-6">
        &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
