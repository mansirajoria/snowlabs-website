import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, SunIcon, MoonIcon, ChevronDownIcon } from 'lucide-react';
import Button from './Button';
import { useDarkMode } from 'usehooks-ts';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for navigation items and sub-items
interface NavItem {
  name: string;
  path?: string; // Path is optional for dropdown containers
  subItems?: NavItem[]; // Optional array for dropdown items
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track open dropdown
  const { isDarkMode, toggle } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false); // Close mobile menu on location change
    setOpenDropdown(null); // Close dropdown on location change
  }, [location]);

  // Updated navItems with Services dropdown and Resources
  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    {
      name: 'Services',
      subItems: [
        { name: 'ServiceNow', path: '/services/servicenow' },
        { name: 'GRC', path: '/services/grc' },
        { name: 'RSA Archer', path: '/services/rsa-archer' },
        { name: 'SAP', path: '/services/sap' },
      ],
    },
    { name: 'Resources', path: '/resources' },
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

  const handleDropdownEnter = (itemName: string) => {
    setOpenDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
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
          <div className="hidden md:flex items-center space-x-1"> {/* Reduced space for more items */}
            {navItems.map((item) => (
              item.subItems ? (
                // Dropdown Menu Item
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button 
                    className={`${linkBaseClass} ${linkInactiveClass} flex items-center`}
                    onClick={(e) => e.preventDefault()} // Prevent navigation on button click
                  >
                    {item.name}
                    <ChevronDownIcon size={16} className={`ml-1 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      >
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {item.subItems.map((subItem) => (
                            <NavLink
                              key={subItem.name}
                              to={subItem.path!} // Use non-null assertion as subItems have paths
                              className={({ isActive }) => 
                                `block px-4 py-2 text-sm ${isActive ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white`
                              }
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)} // Close dropdown on click
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Regular NavLink Item
                <NavLink
                  key={item.name}
                  to={item.path!} // Use non-null assertion as top-level non-dropdowns have paths
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? linkActiveClass : linkInactiveClass}`
                  }
                  end={item.path === '/'} // Ensure 'end' prop is only for Home
                >
                  {item.name}
                </NavLink>
              )
            ))}
             {/* Dark Mode Toggle - Desktop */}
             <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className={`${iconButtonBaseClass} ${iconButtonSolidClass} ml-2`} // Added margin
            >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>

            {/* Get Started Button */}
            <Button 
              to="/get-started" 
              variant={'primary'} 
              size="sm"
              className={`${getStartedButtonSolidClass} ml-2`} // Added margin
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
                className={`${iconButtonBaseClass} ${iconButtonSolidClass} mr-2`}
            >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            {/* Mobile Menu Icon Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
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
              {/* Iterate through items, including sub-items for mobile */}
              {navItems.flatMap((item) => 
                item.subItems ? 
                [ 
                  // Optional: Add a non-clickable header for the group in mobile
                  // <div key={`${item.name}-header`} className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">{item.name}</div>,
                  ...item.subItems.map(subItem => ({ ...subItem, isSubItem: true })) 
                ] : 
                [{...item, isSubItem: false}] 
              ).map((navLinkItem) => (
                <NavLink
                  key={navLinkItem.name}
                  to={navLinkItem.path!} // Assert path exists
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors 
                     ${isActive 
                       ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                       : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'}
                     ${(navLinkItem as any).isSubItem ? 'pl-6' : ''}` // Indent sub-items slightly
                  }
                   end={navLinkItem.path === '/'}
                >
                  {navLinkItem.name}
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