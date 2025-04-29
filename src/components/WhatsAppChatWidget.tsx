import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppChatWidget = () => {
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const phoneNumber = '918076919970';
  const message = encodeURIComponent('Hi Program Manager, I am interested in the training!');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const hideBubble = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if close icon is clicked
    e.stopPropagation();
    setIsBubbleVisible(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isBubbleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative mb-2 mr-1 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            Connect with us on WhatsApp!
            {/* Small triangle pointing down */}
            <div className="absolute bottom-[-5px] right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white dark:border-t-gray-800"></div>
            <button 
              onClick={hideBubble}
              className="absolute top-[-8px] right-[-8px] p-0.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-100 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              aria-label="Close WhatsApp tip"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        {/* Use Font Awesome WhatsApp icon */}
        <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" /> 
      </a>
    </div>
  );
};

export default WhatsAppChatWidget; 