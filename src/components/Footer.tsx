import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

// Define helper function or component for list items if needed, or use direct Links
const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed"
    >
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define course categories based on your input
  const courseCategories = {
    "ServiceNow": [
      "ServiceNow IRM/GRC",
      "ServiceNow ITSM",
      "ServiceNow TPRM",
      "ServiceNow ITOM",
      "ServiceNow ITBM",
      "ServiceNow CSM",
      "ServiceNow HRSD",
      "ServiceNow SecOps",
    ],
    "RSA ARCHER": [
      "RSA ARCHER", // Assuming this links to a general Archer page
      "ARCHER API",
    ],
    "GRC Trainings": [
      "GRC Core Training for Beginners",
      "GRC Functional", // Removed bullet
    ],
    "SAP": [
      "SAP S/4HANA Finance (Simple Finance)", // Removed bullet
      "SAP MM (Materials Management)", // Removed bullet
      "SAP GRC", // Removed bullet
      // Add other SAP courses if needed
    ],
  };

  // Helper to generate slugs (simple version, reuse if available elsewhere)
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
      .replace(/\s+/g, '-') // Collapse whitespace and replace by -
      .replace(/-+/g, '-'); // Collapse dashes
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section: Logo, Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-10">
          <div className="mb-6 md:mb-0">
            {/* Replace with your actual logo component/image if available */}
            <Link to="/" className="flex items-center space-x-3">
               <img 
                 src="/logo/logo.png" // Assuming a white version exists for dark bg
                 alt="SnowLabs Logo" 
                 className="h-10 w-auto" 
               />
               <span className="text-2xl font-bold text-white">SnowLabs</span>
             </Link>
          </div>
          <div className="flex space-x-5 mt-4 md:mt-0">
             {/* Replace # with actual social media links */}
             <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon size={20} /></a>
             <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon size={20} /></a>
             <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon size={20} /></a>
             <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon size={20} /></a>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Company Info & Contact */}
          <div className="text-sm">
            <h4 className="text-white font-semibold uppercase tracking-wider mb-5 text-sm">SnowLabs</h4>
            <p className="text-gray-400 leading-relaxed mb-5">
              Empowering professionals worldwide with expert-led training in ServiceNow, GRC, Archer, and SAP.
            </p>
            <h5 className="mb-2 font-medium text-gray-200">New Delhi HQ</h5>
            <p className="text-gray-400 leading-relaxed flex items-start">
              <MapPinIcon size={14} className="mr-2 mt-1 text-gray-500 flex-shrink-0" />
              <span>Main Headquarters,<br />New Delhi 110080</span>
            </p>
          </div>

          {/* Column 2: Courses (ServiceNow & Archer) */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-5 text-sm">Trainings</h4>
            <ul className="space-y-2.5">
              {courseCategories["ServiceNow"].map(course => (
                <FooterLink key={course} to={`/courses/${slugify(course)}`}>{course}</FooterLink>
              ))}
              {courseCategories["RSA ARCHER"].map(course => (
                <FooterLink key={course} to={`/courses/${slugify(course)}`}>{course}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 3: Courses (GRC & SAP) & Resources */}
          <div>
             <h4 className="text-white font-semibold uppercase tracking-wider mb-5 text-sm">More Trainings & Resources</h4>
             {/* GRC & SAP */}
             <ul className="space-y-2.5 mb-6">
               {courseCategories["GRC Trainings"].map(course => (
                  <FooterLink key={course} to={`/courses/${slugify(course)}`}>{course}</FooterLink>
                ))}
                {courseCategories["SAP"].map(course => (
                  <FooterLink key={course} to={`/courses/${slugify(course)}`}>{course}</FooterLink>
                ))}
             </ul>
             {/* Resources List */}
             <ul className="space-y-2.5">
                <FooterLink to="/resources/webinars">Webinars</FooterLink>
                <FooterLink to="/resources/blogs">Blogs</FooterLink>
                <FooterLink to="/resources/interview-questions">Interview Questions</FooterLink>
                <FooterLink to="/resources/tutorials">Tutorials</FooterLink>
                <FooterLink to="/resources/mock-tests">Mock Test</FooterLink>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-5 text-sm">Company</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/terms-and-conditions">Terms and Conditions</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/refund-policy">Refund Policy</FooterLink>
              {/* <FooterLink to="/careers">Careers</FooterLink> */} 
            </ul>
          </div>
          
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} SnowLabs. All rights reserved.
          </p>
          {/* Optional: Can add bottom links here too if preferred over the column */}
          {/* <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy-policy" className="text-xs text-gray-500 hover:text-white">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="text-xs text-gray-500 hover:text-white">Terms</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;