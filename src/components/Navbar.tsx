import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, SunIcon, MoonIcon } from 'lucide-react';
import Button from './Button';
import { useDarkMode } from 'usehooks-ts';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggle } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Define base and state classes (simplified as background is always solid)
  const navBaseClass = "fixed top-0 left-0 right-0 z-50 transition-colors duration-300";
  const navSolidClass = "bg-white dark:bg-gray-900 shadow-md text-gray-800 dark:text-white";

  const linkBaseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const linkActiveClass = "text-blue-600 dark:text-blue-400"; // Active style for solid background
  const linkInactiveClass = "hover:text-blue-600 dark:hover:text-blue-400"; // Inactive style for solid background
  
  const iconButtonBaseClass = "p-2 rounded-full transition-colors";
  const iconButtonSolidClass = "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700";
  
  // Get Started Button classes (only needs solid background variant)
  const getStartedButtonBaseClass = ""; // Base classes defined in Button component
  const getStartedButtonSolidClass = ""; // Uses variant="primary"
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      // Always apply solid background classes
      className={`${navBaseClass} ${navSolidClass}`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              SnowLabs
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                // Simplified class logic for solid background
                className={({ isActive }) =>
                  `${linkBaseClass} ${isActive ? linkActiveClass : linkInactiveClass}`
                }
                end
              >
                {item.name}
              </NavLink>
            ))}
             {/* Dark Mode Toggle - Desktop */}
             <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                // Simplified class logic for solid background
                className={`${iconButtonBaseClass} ${iconButtonSolidClass}`}
            >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>

            {/* Get Started Button */}
            <Button 
              to="/get-started" 
              variant={'primary'} // Always primary variant
              size="sm"
              className={getStartedButtonSolidClass} // Always use solid state class (currently empty, relies on variant)
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button Area */}
          <div className="-mr-2 flex md:hidden">
            {/* Dark Mode Toggle - Mobile */}
             <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                // Simplified class logic for solid background
                className={`${iconButtonBaseClass} ${iconButtonSolidClass} mr-2`}
            >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            {/* Mobile Menu Icon Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
               // Simplified class logic for solid background
              className={`${iconButtonBaseClass} ${iconButtonSolidClass} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors 
                     ${isActive 
                       ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                       : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'}`
                  }
                   end
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                 <Button 
                  to="/get-started" 
                  variant='primary' 
                  size="sm"
                  fullWidth
                  onClick={() => setIsOpen(false)}
                 >
                   Get Started
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;