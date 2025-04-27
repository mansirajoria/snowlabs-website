import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './Navbar';
import Footer from './Footer';
import ContactPopup from './ContactPopup';
import { useDarkMode } from 'usehooks-ts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Analytics />
      <ContactPopup />
    </div>
  );
};

export default Layout;