import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, TrendingUpIcon, UsersIcon, BookOpenIcon, AwardIcon, Loader2, SearchIcon } from 'lucide-react';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import CourseCard, { CourseType } from '../components/CourseCard';
import CourseCategoriesSection from '../components/CourseCategoriesSection';
import client from '../sanityClient';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Interface for courses fetched for the homepage (similar to Courses.tsx)
interface SanityHomeCourse {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  imageUrl: string;
  difficulty?: string;
  instructor?: string;
  price?: number;
  duration?: string;
  rating?: number;
  students?: number;
  category?: { title: string; slug: { current: string } };
  tags?: string[];
  // featured is used for filtering, not necessarily displaying
}

const Home = () => {
  // State for featured courses
  const [featuredCourses, setFeaturedCourses] = useState<SanityHomeCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState<string | null>(null);
  const [heroSearchTerm, setHeroSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch featured courses on mount
  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      setLoadingCourses(true);
      setErrorCourses(null);
      try {
        // Fetch top 3 featured courses
        const query = `*[_type == "course" && featured == true] | order(_createdAt desc)[0...3] {
          _id,
          title,
          slug,
          shortDescription,
          "imageUrl": image.asset->url,
          difficulty,
          instructor,
          price,
          duration,
          rating,
          students,
          category->{title, "slug": slug.current},
          tags
        }`;
        const coursesData = await client.fetch<SanityHomeCourse[]>(query);
        setFeaturedCourses(coursesData);
      } catch (err) {
        console.error('Failed to fetch featured courses:', err);
        setErrorCourses('Failed to load featured courses.');
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchFeaturedCourses();
  }, []);

  // Updated function for search submission
  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTermTrimmed = heroSearchTerm.trim();
    if (searchTermTrimmed) {
      // Navigate to courses page with search query parameter
      navigate(`/courses?search=${encodeURIComponent(searchTermTrimmed)}`);
    }
  };

  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your Future with{' '}
                <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                  Next-Gen
                </span>{' '}
                Learning
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Unlock your potential with cutting-edge courses designed for the
                digital age. Learn from industry experts and join a community of
                innovators.
              </p>

              {/* Hero Search Bar */}
              <form onSubmit={handleHeroSearch} className="mb-8 max-w-lg">
                <div className="relative">
                  <SearchIcon
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={22} 
                  />
                  <input
                    type="text"
                    placeholder="Search courses, topics, or skills..."
                    value={heroSearchTerm}
                    onChange={(e) => setHeroSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-blue-700 rounded-lg bg-white/10 dark:bg-gray-800/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/20 transition-colors duration-300 shadow-sm"
                  />
                  {/* Submit Button/Icon */}
                  <button 
                    type="submit"
                    aria-label="Submit search"
                    className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                    disabled={!heroSearchTerm.trim()}
                  >
                    <ArrowRightIcon size={20} />
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap gap-4">
                <Button to="/courses" size="lg" variant="primary" icon={<ArrowRightIcon size={20} />}>
                  Explore Courses
                </Button>
                <Button to="/about" size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center mr-2">
                    <UsersIcon size={15} className="text-blue-300" />
                  </div>
                  <div className="text-sm text-blue-100">
                    <span className="font-bold">Over 10,000+</span> Students
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center mr-2">
                    <BookOpenIcon size={15} className="text-blue-300" />
                  </div>
                  <div className="text-sm text-blue-100">
                    <span className="font-bold">More than 30</span> courses
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center mr-2">
                    <UsersIcon size={15} className="text-blue-300" />
                  </div>
                  <div className="text-sm text-blue-100">
                    <span className="font-bold">200+</span> Instructors
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="relative">
              <div className="relative z-10">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students learning" className="rounded-xl shadow-2xl" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-xl dark:shadow-lg w-64 z-20 transition-colors duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <TrendingUpIcon className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">94% Success</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Career advancement</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-xl dark:shadow-lg w-64 z-20 transition-colors duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
                    <AwardIcon className="text-teal-600 dark:text-teal-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">Top Rated</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Industry recognized</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full filter blur-3xl opacity-20 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Trusted By Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-10 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company, index) => <motion.div key={company} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="text-gray-400 dark:text-gray-500 font-bold text-xl">
                  {company}
                </motion.div>)}
          </div>
        </div>
      </section>
      {/* Featured Courses Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Trending Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our most popular courses designed to help you master
              in-demand skills and advance your career.
            </p>
          </AnimatedSection>
          
          {/* Loading/Error/Display for Featured Courses */}
          {loadingCourses ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={36} />
            </div>
          ) : errorCourses ? (
            <div className="text-center py-10 text-red-600 dark:text-red-400">
              <p>{errorCourses}</p>
            </div>
          ) : featuredCourses.length > 0 ? (
            <div className="relative">
              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCourses.map((course, index) => {
                  const courseCardProps: CourseType = {
                    id: course._id,
                    title: course.title,
                    slug: course.slug.current,
                    description: course.shortDescription,
                    image: course.imageUrl || '/placeholder-image.jpg', 
                    level: course.difficulty || 'N/A',
                    instructor: course.instructor || 'N/A',
                    price: course.price ?? 0,
                    duration: course.duration || 'N/A',
                    students: course.students ?? 0,
                    rating: course.rating ?? 0,
                    category: course.category?.title || 'General',
                    tags: course.tags || [],
                    featured: true
                  };
                  return <CourseCard key={course._id} course={courseCardProps} featured={true} index={index} />;
                })}
              </div>

              {/* Mobile Carousel using Swiper */}
              <div className="md:hidden -mx-4 px-4">
                <Swiper
                  modules={[Pagination, A11y, Autoplay]}
                  spaceBetween={16}
                  slidesPerView={1.2}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  grabCursor={true}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  className="pb-16"
                >
                  {featuredCourses.map((course, index) => {
                    const courseCardProps: CourseType = {
                      id: course._id,
                      title: course.title,
                      slug: course.slug.current,
                      description: course.shortDescription,
                      image: course.imageUrl || '/placeholder-image.jpg', 
                      level: course.difficulty || 'N/A',
                      instructor: course.instructor || 'N/A',
                      price: course.price ?? 0,
                      duration: course.duration || 'N/A',
                      students: course.students ?? 0,
                      rating: course.rating ?? 0,
                      category: course.category?.title || 'General',
                      tags: course.tags || [],
                      featured: true
                    };
                    return (
                      <SwiperSlide key={course._id} className="h-full">
                        <div className="h-full">
                          <CourseCard course={courseCardProps} featured={true} index={index} />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
           ) : (
             <p className="text-center text-gray-500 dark:text-gray-400">No featured courses available at the moment.</p>
           )}

          <div className="text-center mt-12">
            <Button to="/courses" variant="outline" icon={<ArrowRightIcon size={18} />} iconPosition="right">
              View All Courses
            </Button>
          </div>
        </div>
      </section>
      {/* Course Categories Section */}
      <CourseCategoriesSection />
      
      {/* Resources Details Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Resources Details
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access valuable learning materials to enhance your skills
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { title: 'Blogs', icon: <BookOpenIcon size={24} /> },
              { title: 'Interview Questions', icon: <CheckIcon size={24} /> },
              { title: 'Mock Test', icon: <ArrowRightIcon size={24} /> },
              { title: 'Tutorial', icon: <TrendingUpIcon size={24} /> },
              { title: 'Webinars', icon: <UsersIcon size={24} /> }
            ].map((resource, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 0.1} 
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
                  {resource.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                  {resource.title}
                </h3>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 px-4 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Learning experience" className="rounded-xl shadow-xl" />
            </AnimatedSection>
            <AnimatedSection direction="right" className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Why Choose SnowLabs?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to providing a cutting-edge learning experience
                that prepares you for the future of work. Our approach combines
                expert instruction, hands-on projects, and a supportive
                community.
              </p>
              <div className="space-y-4 mt-6">
                {[{
                title: 'Industry Expert Instructors',
                description: 'Learn from professionals with real-world experience'
              }, {
                title: 'Project-Based Learning',
                description: 'Build a portfolio of projects that demonstrate your skills'
              }, {
                title: 'Flexible Learning Schedule',
                description: 'Study at your own pace, anywhere, anytime'
              }, {
                title: 'Career Support',
                description: 'Get guidance on job searching and interview preparation'
              }].map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: 20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }} viewport={{
                once: true
              }} className="flex items-start">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 flex-shrink-0">
                      <CheckIcon size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>)}
              </div>
              <Button to="/about" variant="primary" className="mt-6">
                Learn More About Us
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Impact in Numbers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're proud of the impact we've had on our students' lives and
              careers. Here's a glimpse of our achievements.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            icon: <UsersIcon size={32} />,
            value: '50,000+',
            label: 'Students'
          }, {
            icon: <BookOpenIcon size={32} />,
            value: '200+',
            label: 'Courses'
          }, {
            icon: <AwardIcon size={32} />,
            value: '95%',
            label: 'Completion Rate'
          }, {
            icon: <TrendingUpIcon size={32} />,
            value: '80%',
            label: 'Career Growth'
          }].map((stat, index) => <AnimatedSection key={index} delay={index * 0.1} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:border dark:border-gray-700 transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
              </AnimatedSection>)}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Hear from our students who have transformed their careers through
              our courses.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            name: 'Jessica Miller',
            role: 'UX Designer at Google',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'The UX/UI Design Masterclass completely changed my career trajectory. Within 3 months of completing the course, I landed my dream job at Google!'
          }, {
            name: 'Michael Johnson',
            role: 'Full Stack Developer',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: "I had zero coding experience before taking the Web Development Bootcamp. The curriculum was challenging but extremely rewarding. Now I'm working as a full-time developer."
          }, {
            name: 'Sophia Chen',
            role: 'Data Scientist at Amazon',
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            text: 'The Data Science course provided me with practical skills that I use every day in my role. The instructors were knowledgeable and supportive throughout my learning journey.'
          }].map((testimonial, index) => <AnimatedSection key={index} delay={index * 0.1} className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg p-6 rounded-xl text-white">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-lg text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-blue-200 dark:text-blue-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-blue-50 dark:text-gray-200">"{testimonial.text}"</p>
              </AnimatedSection>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-blue-100 dark:text-blue-200 max-w-2xl mx-auto mb-8">
              Join thousands of students who are already advancing their careers
              with SnowLabs. Get started today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/courses" size="lg" variant="primary" className="bg-blue-950 text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-700 dark:hover:bg-gray-100">
                Browse Courses
              </Button>
              <Button to="/contact" size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Contact Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>;
};
export default Home;