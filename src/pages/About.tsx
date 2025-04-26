import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, UsersIcon, BookOpenIcon, AwardIcon, TrendingUpIcon, MailIcon, PhoneIcon, MapPinIcon, ChevronDownIcon } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';

// Helper component for FAQ items (optional, but good practice)
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      layout
      className="border-b border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left text-lg font-medium text-gray-800 dark:text-gray-100"
      >
        <span>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDownIcon size={20} />
        </motion.div>
      </motion.button>
      <motion.div
        layout
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '0.5rem' : '0rem',
          marginBottom: isOpen ? '1rem' : '0rem'
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 dark:text-gray-400 pl-2 pr-6">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  return <div className="w-full pt-28 pb-20 min-h-screen bg-slate-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            ABOUT US
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            At SnowLabs, we're proud to be a trusted leader in ServiceNow, Governance, Risk, and Compliance (GRC) and ARCHER training—empowering over 10,000 students to succeed in high-demand roles across the globe.
          </p>
        </AnimatedSection>
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection direction="left">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Our Story" className="rounded-xl shadow-xl" />
          </AnimatedSection>
          <AnimatedSection direction="right" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400">
              SnowLabs was founded in 2018 with a simple but powerful idea:
              education should be accessible, engaging, and relevant to the
              modern world. SnowLabs aims to provide access learning on for ServiceNow Platforms. What started as a small team with big dreams has grown into a thriving community of learners and educators.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We believe that everyone deserves access to high-quality education
              that prepares them for the future of work. Our platform combines
              cutting-edge technology with expert instruction to create learning
              experiences that are both effective and enjoyable.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, we're proud to have helped over 10,000 students from around
              the world develop new skills, advance their careers, and achieve
              their goals. But this is just the beginning of our journey.
            </p>
          </AnimatedSection>
        </div>
        {/* Our Mission & Vision */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To democratize education by providing accessible, high-quality
                learning experiences that empower individuals to achieve their
                full potential and thrive in a rapidly changing world.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {['Make education accessible to everyone', 'Provide practical, job-relevant skills', 'Foster a supportive learning community', 'Continuously innovate our teaching methods'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckIcon size={18} className="text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To create a world where everyone has the opportunity to learn,
                grow, and succeed, regardless of their background or
                circumstances.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {['A global community of lifelong learners', 'Education that adapts to individual needs', 'Technology that enhances human potential', 'Learning experiences that inspire and engage'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckIcon size={18} className="text-teal-600 dark:text-teal-400 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
        {/* Our Values */}
        <AnimatedSection className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from course content to student support.',
            icon: <AwardIcon size={32} className="text-blue-600 dark:text-blue-400" />
          }, {
            title: 'Innovation',
            description: 'We embrace new ideas and technologies to continuously improve the learning experience.',
            icon: <TrendingUpIcon size={32} className="text-blue-600 dark:text-blue-400" />
          }, {
            title: 'Accessibility',
            description: 'We believe education should be accessible to everyone, regardless of background or location.',
            icon: <UsersIcon size={32} className="text-blue-600 dark:text-blue-400" />
          }, {
            title: 'Community',
            description: 'We foster a supportive community where students and instructors can learn from each other.',
            icon: <UsersIcon size={32} className="text-blue-600 dark:text-blue-400" />
          }, {
            title: 'Practicality',
            description: 'We focus on practical, job-relevant skills that prepare students for real-world success.',
            icon: <BookOpenIcon size={32} className="text-blue-600 dark:text-blue-400" />
          }, {
            title: 'Integrity',
            description: 'We operate with honesty, transparency, and respect in all our interactions.',
            icon: <CheckIcon size={32} className="text-blue-600 dark:text-blue-400" />
          }].map((value, index) => <motion.div key={index} initial={{
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
          }} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-gray-700">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>)}
          </div>
        </AnimatedSection>
        {/* Stats */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-xl shadow-xl p-8 mb-20">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-blue-200 dark:text-blue-200 max-w-2xl mx-auto">
              We're proud of the difference we've made in our students' lives
              and careers. Here's a glimpse of our impact so far.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            value: '10,000+',
            label: 'Students Worldwide'
          }, {
            value: '100+',
            label: 'Expert Instructors'
          }, {
            value: '95%',
            label: 'Completion Rate'
          }, {
            value: '80%',
            label: 'Career Advancement'
          }].map((stat, index) => <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="text-blue-200 dark:text-blue-200">{stat.label}</div>
              </AnimatedSection>)}
          </div>
        </div>
        {/* Get in Touch */}
        <AnimatedSection className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Main Headquarters</h3>
              <div className="flex items-start mb-3">
                <MapPinIcon size={18} className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-300">
                  New Delhi 110080
                </span>
              </div>
              <div className="flex items-center">
                <MailIcon size={18} className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <a href="mailto:your-official-email@example.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  your-official-email@example.com
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Have questions or want to discuss corporate training? Reach out to us!</p>
              <Button to="/contact" variant="primary">
                Contact Us Page
              </Button>
            </div>
          </div>
        </AnimatedSection>
        {/* FAQ */}
        <AnimatedSection className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <FaqItem 
              question="Can I get a refund if I'm not satisfied?"
              answer="Yes, we offer a money-back guarantee for most of our courses. If you're not satisfied with your purchase, you can request a full refund after the 2 session only days of enrollment. After completing 2 sessions are you not eligible for refund."
            />
            <FaqItem 
              question="Do you offer certificates upon completion?"
              answer="Yes, all our courses come with a certificate of completion that you can add to your resume or LinkedIn profile."
            />
            <FaqItem 
              question="How long do I have access to course materials?"
              answer="Once enrolled, you have lifetime access to the course materials, and recordings of sessions including any future updates to the curriculum. You can learn at your own pace and revisit the content whenever you need to."
            />
            <FaqItem 
              question="How can I get help if I'm stuck on a lesson?"
              answer="We offer multiple support channels for students. You can connect with your training manager or we have internal WhatsApp group for communication or contact our support team directly for assistance."
            />
          </div>
        </AnimatedSection>
        {/* CTA */}
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Join Our Learning Community
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Ready to start your learning journey with SnowLabs? Explore our
            courses and join thousands of students who are already advancing
            their careers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/courses" size="lg" variant="primary">
              Browse Courses
            </Button>
            <Button to="/contact" size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>;
};
export default About;