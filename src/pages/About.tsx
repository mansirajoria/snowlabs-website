import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, UsersIcon, BookOpenIcon, AwardIcon, TrendingUpIcon } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';

const About = () => {
  return <div className="w-full pt-28 pb-20 min-h-screen">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About SnowLabs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're on a mission to transform education through innovative
            technology and engaging learning experiences.
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
              modern world. What started as a small team with big dreams has
              grown into a thriving community of learners and educators.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We believe that everyone deserves access to high-quality education
              that prepares them for the future of work. Our platform combines
              cutting-edge technology with expert instruction to create learning
              experiences that are both effective and enjoyable.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, we're proud to have helped over 50,000 students from around
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
        {/* Our Team */}
        <AnimatedSection className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Our Leadership Team
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Meet the passionate individuals who are driving our mission forward
            and helping to shape the future of education.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            name: 'David Chen',
            role: 'Founder & CEO',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            bio: 'Former tech executive with a passion for education and accessibility.'
          }, {
            name: 'Sarah Johnson',
            role: 'Chief Learning Officer',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            bio: 'EdTech innovator with 15+ years of experience in curriculum development.'
          }, {
            name: 'Michael Rodriguez',
            role: 'CTO',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            bio: 'Software engineer and AI specialist focused on creating personalized learning experiences.'
          }, {
            name: 'Emily Zhang',
            role: 'Head of Student Success',
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            bio: 'Former educator dedicated to supporting students throughout their learning journey.'
          }].map((person, index) => <motion.div key={index} initial={{
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
                <img src={person.image} alt={person.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {person.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{person.bio}</p>
                </div>
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
            value: '50,000+',
            label: 'Students Worldwide'
          }, {
            value: '200+',
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