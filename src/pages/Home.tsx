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

// Interface for raw data fetched from Sanity
interface SanityFetchedCourse {
  _id: string;
  title: string;
  slug: { current: string }; // Raw slug
  shortDescription?: string; // Keep original field names
  imageUrl?: string;
  difficulty?: string;
  instructor?: string;
  price?: number;
  duration?: string;
  rating?: number;
  students?: number;
  category?: { title: string; slug: { current: string } };
  tags?: string[];
  featured?: boolean;
  startDate?: string;
  isUpcoming?: boolean;
}

// Processed data type: Includes CourseType fields + displayType
interface DisplayCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  level: string;
  instructor: string;
  price: number;
  duration: string;
  students: number;
  rating: number;
  category: string;
  tags: string[];
  featured: boolean;
  startDate?: string;
  isUpcoming?: boolean;
  displayType: 'trending' | 'upcoming';
  _id: string;
}

// Configurable limits
const TRENDING_LIMIT = 3;
const UPCOMING_LIMIT = 3;

// Define company logos outside the component (or fetch if dynamic)
const companyLogos = [
  { name: 'TCS', src: '/companies/tcs.png' },
  { name: 'EY', src: '/companies/ey.png' },
  { name: 'PwC', src: '/companies/pwc.png' },
  { name: 'Optum', src: '/companies/optum.png' },
  { name: 'KPMG', src: '/companies/kpmg.png' },
  { name: 'Deloitte', src: '/companies/deloitte.png' },
];

const Home = () => {
  const [combinedCourses, setCombinedCourses] = useState<DisplayCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState<string | null>(null);
  const [heroSearchTerm, setHeroSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCombinedCourses = async () => {
      setLoadingCourses(true);
      setErrorCourses(null);
      try {
        const courseFields = `{
          _id,
          title,
          slug, // Fetch slug object
          shortDescription,
          "imageUrl": image.asset->url,
          difficulty,
          instructor,
          price,
          duration,
          rating,
          students,
          category->{title, "slug": slug.current},
          tags,
          featured,
          isUpcoming,
          startDate
        }`;

        const trendingQuery = `*[_type == "course" && featured == true] | order(_createdAt desc)[0...${TRENDING_LIMIT}] ${courseFields}`;
        const upcomingQuery = `*[_type == "course" && isUpcoming == true && featured != true] | order(startDate asc)[0...${UPCOMING_LIMIT}] ${courseFields}`; // Adjusted upcoming query slightly

        const [trendingData, upcomingData] = await Promise.all([
          client.fetch<SanityFetchedCourse[]>(trendingQuery),
          client.fetch<SanityFetchedCourse[]>(upcomingQuery)
        ]);

        // Use the refined DisplayCourse type for mapping
        const mapToDisplayCourse = (course: SanityFetchedCourse, type: 'trending' | 'upcoming'): DisplayCourse => ({
          id: course._id,
          _id: course._id,
          title: course.title,
          slug: course.slug.current,
          description: course.shortDescription || '',
          image: course.imageUrl || '/placeholder-image.jpg',
          level: course.difficulty || 'N/A',
          instructor: course.instructor || 'N/A',
          price: course.price ?? 0,
          duration: course.duration || 'N/A',
          students: course.students ?? 0,
          rating: course.rating ?? 0,
          category: course.category?.title || 'General',
          tags: course.tags || [],
          featured: course.featured ?? false,
          startDate: course.startDate,
          isUpcoming: course.isUpcoming ?? false,
          displayType: type
        });

        const trendingCoursesMapped: DisplayCourse[] = trendingData.map(c => mapToDisplayCourse(c, 'trending'));
        const upcomingCoursesMapped: DisplayCourse[] = upcomingData.map(c => mapToDisplayCourse(c, 'upcoming'));

        setCombinedCourses([...trendingCoursesMapped, ...upcomingCoursesMapped]);

      } catch (err) {
        console.error('Failed to fetch combined courses:', err);
        setErrorCourses('Failed to load courses.');
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCombinedCourses();
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
                Career Transformation{' '}
                <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                  Begins Here
                </span>{' '}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover practical, expert-driven training in ServiceNow and Archer that opens new career paths. Leader of ServiceNow and Archer
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
                    <h3 className="font-bold text-gray-800 dark:text-white">94% Training Result</h3>
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
                    <h3 className="font-bold text-gray-800 dark:text-white">GRC and Archer Leader</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Industry recognized</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full filter blur-3xl opacity-20 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Marquee */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 transition-colors duration-300 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
          <h3 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
            Trusted by professionals at leading companies
          </h3>
          <div className="relative flex overflow-hidden group">
            <div className="flex animate-marquee group-hover:pause whitespace-nowrap">
              {[...companyLogos, ...companyLogos].map((logo, index) => {
                // Define base max-height and specific height adjustments
                const baseHeightClass = "max-h-8 md:max-h-10";
                const specificHeightClass = "h-10 md:h-12"; // Explicit height for EY & PwC
                
                let heightClass = baseHeightClass; // Default
                if (logo.name === 'EY' || logo.name === 'PwC') {
                  heightClass = specificHeightClass;
                }
                
                return (
                  <div key={`${logo.name}-${index}-marquee`} className="mx-8 flex-shrink-0 flex items-center justify-center h-12 md:h-14"> 
                    <img 
                      src={logo.src} 
                      alt={`${logo.name} logo`} 
                      className={`${heightClass} object-contain w-auto`} // Apply dynamic height class
                      loading="lazy"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Combined Courses Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Trending and Upcoming Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our popular courses and secure your spot in upcoming sessions.
            </p>
          </AnimatedSection>
          
          {/* Loading/Error/Display Logic - Use combinedCourses state */}
          {loadingCourses ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={36} />
            </div>
          ) : errorCourses ? (
            <div className="text-center py-10 text-red-600 dark:text-red-400">
              <p>{errorCourses}</p>
            </div>
          ) : combinedCourses.length > 0 ? (
            <div className="relative">
              {/* Desktop Grid - Pass course and displayType */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {combinedCourses.map((course, index) => (
                  <CourseCard 
                    key={course._id} 
                    course={course} // Pass the object matching CourseType implicitly
                    displayType={course.displayType} // Pass displayType separately
                    index={index} 
                  />
                ))}
              </div>

              {/* Mobile Carousel - Pass course and displayType */}
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
                  {combinedCourses.map((course, index) => (
                    <SwiperSlide key={course._id} className="h-full">
                      <div className="h-full">
                        <CourseCard 
                          course={course} 
                          displayType={course.displayType}
                          index={index} 
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
           ) : (
             <p className="text-center text-gray-500 dark:text-gray-400">No courses available at the moment.</p>
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
              Designed for Professionals. Driven by Results.
              At SnowLabs, we don't just teach—we train you to thrive. Whether you're diving into ServiceNow or mastering RSA Archer, SAP, our programs are built by industry experts to prepare you for real-world success.

              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[{
                title: 'Learn from Industry Experts',
                description: 'Learn from professionals with real-world experienceTrain with professionals who bring real-world experience, not just theory'
              }, {
                title: 'Real-Time Projects',
                description: 'Build a standout portfolio with hands-on, real-time projects'
              }, {
                title: 'Always Updated Curriculum',
                description: 'Stay ahead with the latest industry standards and trends'
              }, {
                title: 'Flexible Learning',
                description: 'Study at your own pace, anywhere—our platform fits your schedule'
              }, {
                title: 'Career Support',
                description: 'Get career counseling, job referrals, and interview prep'
              }, {
                title: 'Placement Assistance',
                description: 'Connect with hiring partners and boost your chances of landing your dream job'
              }, {
                title: 'Small Batch Sizes',
                description: 'Receive personalized attention in limited-size training groups'
              }, {
                title: 'No-Cost EMI Options',
                description: 'Learn now, pay later with easy, no-cost EMI plans'
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
            value: '10,000+',
            label: 'Students'
          }, {
            icon: <BookOpenIcon size={32} />,
            value: '30+',
            label: 'Courses'
          }, {
            icon: <AwardIcon size={32} />,
            value: '95%',
            label: 'Completion Rate'
          }, {
            icon: <TrendingUpIcon size={32} />,
            value: '20+',
            label: 'Corporate Trainings'
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
            role: 'ServiceNow Developer',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'SnowLabs ServiceNow training was incredibly thorough. The hands-on projects gave me the confidence I needed, and I quickly found a great role after completion.'
          }, {
            name: 'Michael Johnson',
            role: 'GRC Consultant',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: "The Archer and GRC courses were exactly what I needed to pivot my career. The instructors were experts and the practical approach made learning complex topics manageable."
          }, {
            name: 'Sophia Chen',
            role: 'SAP Analyst',
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            text: 'Excellent SAP course content and fantastic support from the training manager. The lifetime access to materials is a huge plus for staying updated.'
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