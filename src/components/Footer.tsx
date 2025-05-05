import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import client from '../sanityClient'; // Import Sanity client

// Interface for fetched course data
interface FooterCourse {
  _id: string;
  title: string;
  slug: { current: string };
}

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
  const [courses, setCourses] = useState<FooterCourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch featured courses first, ordered by title
        const featuredQuery = `*[_type == "course" && featured == true]{ _id, title, slug, featured } | order(title asc)`;
        // Fetch non-featured courses (including those where featured might be null/undefined), ordered by title
        const nonFeaturedQuery = `*[_type == "course" && (!defined(featured) || featured == false)]{ _id, title, slug, featured } | order(title asc)`;
        
        const [featuredData, nonFeaturedData] = await Promise.all([
          client.fetch<FooterCourse[]>(featuredQuery),
          client.fetch<FooterCourse[]>(nonFeaturedQuery)
        ]);

        // Combine the arrays, ensuring featured are first
        setCourses([...featuredData, ...nonFeaturedData]);
      } catch (error) {
        console.error("Failed to fetch courses for footer:", error);
        setCourses([]); 
      }
    };

    fetchCourses();
  }, []);

  // Split courses for distribution across columns (simple split)
  const midPoint = Math.ceil(courses.length / 2);
  const firstHalfCourses = courses.slice(0, midPoint);
  const secondHalfCourses = courses.slice(midPoint);

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
             <a href="https://www.linkedin.com/company/snowlabs-pvt-ltd/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon size={20} /></a>
             <a href="https://x.com/SnowlabsL36432" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon size={20} /></a>
             <a href="https://www.facebook.com/profile.php?id=61576203412195" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon size={20} /></a>
             <a href="https://www.instagram.com/snowlabs_trainings/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon size={20} /></a>
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
            {/* Added Contact Info */}
            <div className="space-y-2.5 mb-5">
              <a href="mailto:training@snowlabs.in" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                <MailIcon size={14} className="mr-2 text-gray-500 flex-shrink-0" />
                training@snowlabs.in
              </a>
              <a href="tel:+919211526410" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                <PhoneIcon size={14} className="mr-2 text-gray-500 flex-shrink-0" />
                +91 9211 526410
              </a>
            </div>
            <h5 className="mb-2 font-medium text-gray-200">New Delhi HQ</h5>
            <p className="text-gray-400 leading-relaxed flex items-start">
              <MapPinIcon size={14} className="mr-2 mt-1 text-gray-500 flex-shrink-0" />
              <span>Main Headquarters,<br />New Delhi 110080</span>
            </p>
          </div>

          {/* Column 2: Courses (First Half) */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-5 text-sm">Trainings</h4>
            <ul className="space-y-2.5">
              {firstHalfCourses.length > 0 ? (
                firstHalfCourses.map(course => (
                  <FooterLink key={course._id} to={`/courses/${course.slug.current}`}>{course.title}</FooterLink>
                ))
              ) : (
                <li className="text-gray-500 text-sm">Loading courses...</li>
              )}
            </ul>
          </div>

          {/* Column 3: Courses (Second Half) & Resources */}
          <div>
             <h4 className="text-white font-semibold uppercase tracking-wider mb-5 text-sm">More Trainings & Resources</h4>
             {/* GRC & SAP */}
             <ul className="space-y-2.5 mb-6">
              {secondHalfCourses.length > 0 ? (
                secondHalfCourses.map(course => (
                  <FooterLink key={course._id} to={`/courses/${course.slug.current}`}>{course.title}</FooterLink>
                ))
              ) : (
                <li className="text-gray-500 text-sm"> </li>
              )}
             </ul>
             {/* Resources List - Updated */}
             <ul className="space-y-2.5">
                <FooterLink to="/resources/blogs">Blogs</FooterLink>
                <FooterLink to="/resources/interview-questions">Interview Questions</FooterLink>
                <FooterLink to="/resources/mock-test">Mock Test</FooterLink>
                <FooterLink to="/resources/webinars">Webinars</FooterLink>
            </ul>
          </div>

          {/* Column 4: Company & Legal - Updated */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-5 text-sm">Company</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/refund-policy">Refund Policy</FooterLink>
            </ul>
          </div>
          
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} SnowLabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;