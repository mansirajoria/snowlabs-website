import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent mb-6">
              SnowLabs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Transforming education through innovative technology and engaging
              learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/courses/web-development" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses/data-science" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/courses/machine-learning" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/courses/ux-design" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  UX Design
                </Link>
              </li>
              <li>
                <Link to="/courses/digital-marketing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPinIcon size={18} className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Education Street, Learning City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon size={18} className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MailIcon size={18} className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">info@SnowLabs.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {currentYear} SnowLabs. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;