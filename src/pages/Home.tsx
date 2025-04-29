import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, TrendingUpIcon, UsersIcon, BookOpenIcon, AwardIcon, Loader2, SearchIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import CourseCard, { CourseType } from '../components/CourseCard';
import CourseCategoriesSection from '../components/CourseCategoriesSection';
import client from '../sanityClient';
import { useNavigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ContactForm from '../components/ContactForm';

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

// Interface for fetched testimonial data
interface SanityTestimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  authorImageUrl?: string;
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
  const [testimonials, setTestimonials] = useState<SanityTestimonial[]>([]); // State for testimonials
  const [loadingTestimonials, setLoadingTestimonials] = useState(true); // Loading state for testimonials
  const [errorTestimonials, setErrorTestimonials] = useState<string | null>(null); // Error state for testimonials
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

    // --- Fetch Testimonials Logic (new) ---
    const fetchTestimonials = async () => {
      setLoadingTestimonials(true);
      setErrorTestimonials(null);
      try {
        // Fetch testimonials marked for homepage display
        const query = `*[_type == "testimonial" && displayOnHomepage == true]{
          _id,
          quote,
          authorName,
          authorRole,
          "authorImageUrl": authorImage.asset->url
        }[0...3]`; // Limit to 3 for the homepage
        const data = await client.fetch<SanityTestimonial[]>(query);
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setErrorTestimonials("Failed to load testimonials.");
      } finally {
        setLoadingTestimonials(false);
      }
    };

    // Call both fetch functions
    fetchCombinedCourses();
    fetchTestimonials();

  }, []); // Combined dependency array

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
            <div className="relative group">
              <Swiper
                modules={[Pagination, Navigation, A11y, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                grabCursor={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                loop={combinedCourses.length > 3}
                className="pb-16"
                breakpoints={{
                  // when window width is >= 768px (md)
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  // when window width is >= 1024px (lg)
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                  }
                }}
              >
                {combinedCourses.map((course, index) => (
                  <SwiperSlide key={course._id} className="h-full pb-4">
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
              {/* Custom Navigation Arrows - Positioned outside */}
              <button className="swiper-button-prev-custom absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer">
                <ChevronLeftIcon className="text-gray-700 dark:text-gray-200" />
              </button>
              <button className="swiper-button-next-custom absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer">
                <ChevronRightIcon className="text-gray-700 dark:text-gray-200" />
              </button>
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

      {/* Connect with Advisor Section - MOVED HERE */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300 px-4">
        <AnimatedSection className="container mx-auto max-w-6xl text-center">
          <div className="mb-8 md:mb-10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Connect with a Course Advisor
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions about our courses or need guidance on the best path for your career goals?
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 h-2 w-full"></div>
            <div className="p-6 md:p-8">
              {/* Custom 2x2 Grid Form Layout */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Your name" 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    placeholder="your.email@example.com" 
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Your phone number" 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={3} 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    placeholder="How can we help you?" 
                  />
                </div>
                
                <div className="col-span-1 md:col-span-2 mt-2">
                  <button 
                    type="submit" 
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <span>Send Message</span>
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
         </AnimatedSection>
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
              { title: 'Blogs', icon: <BookOpenIcon size={24} />, link: '/resources/blogs' },
              { title: 'Interview Questions', icon: <CheckIcon size={24} />, link: '/resources/interview-questions' },
              { title: 'Mock Test', icon: <ArrowRightIcon size={24} />, link: '/resources/mock-tests' },
              { title: 'Tutorial', icon: <TrendingUpIcon size={24} />, link: '/resources/tutorials' },
              { title: 'Webinars', icon: <UsersIcon size={24} />, link: '/resources/webinars' }
            ].map((resource, index) => (
              <Link to={resource.link} key={resource.title} className="block group">
                <AnimatedSection 
                  delay={index * 0.1} 
                  className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:shadow-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-all duration-300 h-full"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {resource.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-center text-sm md:text-base">
                    {resource.title}
                  </h3>
                </AnimatedSection>
              </Link>
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
              Hear from our students who have transformed their careers through our courses.
            </p>
          </AnimatedSection>
          
          {/* Loading/Error/Display Logic for Testimonials */}
          {loadingTestimonials ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-white" size={36} />
            </div>
          ) : errorTestimonials ? (
            <div className="text-center py-10 text-red-300">
              <p>{errorTestimonials}</p>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection 
                  key={testimonial._id} 
                  delay={index * 0.1} 
                  className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg p-6 rounded-xl text-white flex flex-col h-full"
                >
                  <p className="italic text-blue-50 dark:text-gray-200 mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center mt-auto">
                    <img 
                      src={testimonial.authorImageUrl || 'https://via.placeholder.com/150/771796'} // Placeholder image
                      alt={testimonial.authorName} 
                      className="w-12 h-12 rounded-full mr-4 object-cover bg-gray-500"
                     />
                    <div>
                      <h4 className="font-semibold text-lg text-white">
                        {testimonial.authorName}
                      </h4>
                      {testimonial.authorRole && (
                        <p className="text-blue-200 dark:text-blue-300 text-sm">{testimonial.authorRole}</p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <p className="text-center text-blue-100">No testimonials available yet.</p>
          )}
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

      {/* Company Logos */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-850 transition-colors duration-300 px-4">
        <div className="container mx-auto max-w-6xl">
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
    </div>;
};
export default Home;