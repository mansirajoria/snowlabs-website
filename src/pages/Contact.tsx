import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const officeLocations = [{
    city: 'San Francisco',
    address: '123 Market Street, Suite 456, San Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'sf@SnowLabs.com',
    hours: 'Mon-Fri: 9AM-6PM'
  }, {
    city: 'New York',
    address: '789 Broadway Avenue, 10th Floor, New York, NY 10003',
    phone: '+1 (555) 987-6543',
    email: 'nyc@SnowLabs.com',
    hours: 'Mon-Fri: 9AM-6PM'
  }, {
    city: 'London',
    address: '45 Oxford Street, London, UK W1D 2DZ',
    phone: '+44 20 1234 5678',
    email: 'london@SnowLabs.com',
    hours: 'Mon-Fri: 9AM-6PM'
  }];

  return <div className="w-full pt-28 pb-20 min-h-screen">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions or need help? We're here for you. Reach out to our
            team and we'll get back to you as soon as possible.
          </p>
        </AnimatedSection>
        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <AnimatedSection direction="left">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 h-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <MapPinIcon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Main Headquarters</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Education Street, Learning City, 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <PhoneIcon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <MailIcon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@SnowLabs.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <ClockIcon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Working Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monday - Friday: 9AM - 6PM
                      <br />
                      Saturday: 10AM - 4PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-full transition-colors">
                    <FacebookIcon size={20} />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-full transition-colors">
                    <TwitterIcon size={20} />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-full transition-colors">
                    <InstagramIcon size={20} />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-3 rounded-full transition-colors">
                    <LinkedinIcon size={20} />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <ContactForm className="h-full" />
          </AnimatedSection>
        </div>
        {/* Office Locations */}
        <AnimatedSection className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-3xl font-bold text-gray-300 dark:text-gray-500">
                    {office.city}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {office.city} Office
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPinIcon size={18} className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-600 dark:text-gray-400">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon size={18} className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{office.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MailIcon size={18} className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{office.email}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon size={18} className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{office.hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </AnimatedSection>
        {/* FAQ */}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{
              question: 'How do I enroll in a course?',
              answer: "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through the registration and payment process."
            }, {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for course payments. Some courses also offer payment plans.'
            }, {
              question: "Can I get a refund if I'm not satisfied?",
              answer: "Yes, we offer a 30-day money-back guarantee for most of our courses. If you're not satisfied with your purchase, you can request a full refund within 30 days of enrollment."
            }, {
              question: 'How long do I have access to course materials?',
              answer: 'Once enrolled, you have lifetime access to the course materials, including any future updates to the curriculum. You can learn at your own pace and revisit the content whenever you need to.'
            }, {
              question: 'Do you offer certificates upon completion?',
              answer: 'Yes, all our courses come with a certificate of completion that you can add to your resume or LinkedIn profile. Some courses also offer industry-recognized certifications.'
            }, {
              question: "How can I get help if I'm stuck on a lesson?",
              answer: 'We offer multiple support channels for students. You can post questions in the course discussion forum, join weekly live Q&A sessions, or contact our support team directly for assistance.'
            }].map((faq, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </motion.div>)}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>;
};
export default Contact;