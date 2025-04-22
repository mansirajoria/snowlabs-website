import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
import Button from './Button';

interface ContactFormProps {
  title?: string;
  courseId?: string;
  className?: string;
}

// Read endpoint from environment variables
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const ContactForm: React.FC<ContactFormProps> = ({
  title = 'Get in Touch',
  courseId,
  className = ''
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

    // Prepare data for Formspree, including the courseId if available
    const formData = { 
      ...formState,
      ...(courseId && { _courseId: courseId }) // Add courseId with a prefix if present
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
        setFormState({ name: '', email: '', phone: '', message: '' }); // Clear form
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

  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 ${className} transition-colors duration-300`}>
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h3>
      {status === 'success' ? <motion.div initial={{
      opacity: 0,
      scale: 0.8
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 rounded-lg p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center mb-4">
            <CheckIcon className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <h4 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
            Message Sent!
          </h4>
          <p className="text-green-700 dark:text-green-400">
            Thank you for contacting us. We'll get back to you shortly.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>
            Send Another Message
          </Button>
        </motion.div> : <form onSubmit={handleSubmit}>
          {courseId && <input type="hidden" name="_courseId" value={courseId} />}
          <div className="space-y-4">
            {[
              { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
              { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com', required: true },
              { id: 'phone', label: 'Phone Number (optional)', type: 'tel', placeholder: 'Your phone number', required: false },
            ].map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label}
                </label>
                <input 
                  type={field.type} 
                  id={field.id} 
                  name={field.id} 
                  value={formState[field.id as keyof typeof formState]} 
                  onChange={handleChange} 
                  required={field.required}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  placeholder={field.placeholder} 
                  disabled={status === 'submitting'} 
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea 
                id="message" 
                name="message" 
                value={formState.message} 
                onChange={handleChange} 
                required 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                placeholder="How can we help you?" 
                disabled={status === 'submitting'} 
              />
            </div>
            {status === 'error' && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-lg flex items-center text-red-700 dark:text-red-400">
                <AlertCircleIcon size={18} className="mr-2 flex-shrink-0" />
                <span>
                  There was an error sending your message. Please try again.
                </span>
              </motion.div>}
            <Button type="submit" variant="primary" fullWidth disabled={status === 'submitting' || !formspreeEndpoint} icon={status === 'submitting' ? <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg> : <SendIcon size={18} />} iconPosition="right">
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>}
    </motion.div>;
};
export default ContactForm;