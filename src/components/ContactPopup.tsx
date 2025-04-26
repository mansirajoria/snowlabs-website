import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, SendIcon, CheckIcon, AlertCircleIcon, MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react';
import Button from './Button';

// Read endpoint from environment variables
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const ContactPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Check if the popup has been closed before
    const hasClosedPopup = localStorage.getItem('hasClosedContactPopup') === 'true';
    
    if (!hasClosedPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Store in localStorage that the user has closed the popup
    localStorage.setItem('hasClosedContactPopup', 'true');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    if (!formspreeEndpoint) {
      console.error('Formspree endpoint URL is not configured in .env file.');
      setStatus('error');
      return;
    }

    const formData = { 
      ...formState,
      _source: 'popup_form'
    };

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ email: '', phone: '', message: '' });
      } else {
        // Try to get error details from Formspree response
        try {
          const errorData = await response.json();
          console.error('Formspree submission error:', errorData);
        } catch (jsonError) {
          console.error('Formspree submission failed with status:', response.status);
        }
        setStatus('error');
      }
    } catch (error) {
      console.error('Network error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40"
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-full max-w-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image and text overlay */}
              <div className="relative w-full md:w-1/2">
                <div className="h-48 md:h-full overflow-hidden">
                  <img 
                    src="/popup-image.jpeg" 
                    alt="Training and development" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-900/80 to-transparent h-48 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-md">
                      Find Your Ideal Training Program
                    </h3>
                    <p className="text-white/90 text-sm mb-0 drop-shadow-md">
                      Join thousands of professionals who've elevated their careers with our expert training solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="w-full md:w-1/2 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Talk To Our Advisor
                  </h3>
                  {/* Close button */}
                  <button 
                    onClick={closePopup}
                    className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close popup"
                  >
                    <XIcon size={18} />
                  </button>
                </div>

                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-200 dark:shadow-green-900/20">
                      <CheckIcon className="text-white" size={32} />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Thanks for Reaching Out!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Your request has been received. We'll be in touch with you shortly to discuss your training needs.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white dark:bg-gray-800 shadow-sm" 
                      onClick={closePopup}
                    >
                      Close Window
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon size={16} className="text-blue-500 dark:text-blue-400" />
                      </div>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formState.email} 
                        onChange={handleChange} 
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your.email@example.com" 
                        disabled={status === 'submitting'} 
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon size={16} className="text-blue-500 dark:text-blue-400" />
                      </div>
                      <input 
                        type="tel"
                        id="phone" 
                        name="phone" 
                        value={formState.phone} 
                        onChange={handleChange} 
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your phone number" 
                        disabled={status === 'submitting'} 
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <MessageSquareIcon size={16} className="text-blue-500 dark:text-blue-400" />
                      </div>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formState.message} 
                        onChange={handleChange} 
                        rows={3}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="I'm interested in learning more about... (Optional)" 
                        disabled={status === 'submitting'} 
                      />
                    </div>
                    
                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-lg flex items-center text-red-700 dark:text-red-400 text-sm"
                      >
                        <AlertCircleIcon size={16} className="mr-2 flex-shrink-0" />
                        <span>
                          There was an error. Please try again.
                        </span>
                      </motion.div>
                    )}
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      fullWidth 
                      className="mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
                      disabled={status === 'submitting'} 
                      icon={status === 'submitting' ? (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <SendIcon size={16} />
                      )} 
                      iconPosition="right"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Request Information'}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                      By submitting this form, you agree to our <span className="underline cursor-pointer">Privacy Policy</span>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup; 