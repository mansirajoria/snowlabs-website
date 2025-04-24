import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, Loader2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import CourseCard, { CourseType } from '../components/CourseCard';
import client from '../sanityClient';
import { Link, useSearchParams } from 'react-router-dom';

// Interface for fetched category data
interface SanityCategory {
  title: string;
  slug: string; // Assuming slug is string { current: string }
}

// Updated SanityCourse interface
interface SanityCourse {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  imageUrl: string;
  difficulty: string;
  instructor?: string;
  price?: number;
  duration?: string;
  rating?: number;
  students?: number;
  category?: { // Make category optional initially if some courses might not have it yet
    title: string;
    slug: string;
  };
}

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All'; // Get initial category slug
  const initialLevel = searchParams.get('level') || 'All';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  // Selected category state now stores the SLUG
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  
  const [allCourses, setAllCourses] = useState<SanityCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<SanityCourse[]>([]);
  const [availableCategories, setAvailableCategories] = useState<SanityCategory[]>([]); // State for fetched categories
  
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Fetch all courses and categories from Sanity on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setLoadingCategories(true);
      setError(null);
      try {
        // Fetch courses with category info
        const courseQuery = `*[_type == "course"]{
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
          category->{title, "slug": slug.current} // Fetch referenced category title and slug
        }`;
        
        // Fetch available categories
        const categoryQuery = `*[_type == "category"] | order(title asc) {title, "slug": slug.current}`;

        // Fetch in parallel
        const [coursesData, categoriesData] = await Promise.all([
          client.fetch<SanityCourse[]>(courseQuery),
          client.fetch<SanityCategory[]>(categoryQuery)
        ]);

        setAllCourses(coursesData);
        setFilteredCourses(coursesData); // Initially show all
        setAvailableCategories(categoriesData);

      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
        setLoadingCategories(false);
      }
    };

    fetchInitialData();
  }, []); // Fetch only once on mount

  // Update URL params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedLevel !== 'All') params.level = selectedLevel;
    if (selectedCategory !== 'All') params.category = selectedCategory; // Use category slug

    setSearchParams(params, { replace: true });

  }, [searchTerm, selectedLevel, selectedCategory, setSearchParams]);


  // Filter courses based on state (search, level, category)
  useEffect(() => {
    if (loading) return; // Don't filter until courses are loaded

    let result = allCourses;
    const term = searchTerm.toLowerCase();

    if (term) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(term)
        // TODO: Consider searching description, instructor, etc.
      );
    }

    if (selectedLevel !== 'All') {
      const levelLower = selectedLevel.toLowerCase();
      result = result.filter(course => course.difficulty && course.difficulty.toLowerCase() === levelLower);
    }

    if (selectedCategory !== 'All') {
      // Filter by category slug
      result = result.filter(course => course.category && course.category.slug === selectedCategory);
    }

    setFilteredCourses(result);

  }, [searchTerm, selectedLevel, selectedCategory, allCourses, loading]); // Depend on all filters and data


  return (
    <div className="w-full pt-28 pb-20 bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="container mx-auto max-w-6xl px-4">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Explore Our Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover a wide range of courses designed to help you master new
            skills and advance your career.
          </p>
        </AnimatedSection>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <SearchIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search courses by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                />
              </div>

              {/* Mobile Filter Toggle */}
              <button
                className="md:hidden flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterIcon size={18} className="mr-2" />
                Filters
              </button>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-4">
                 {/* Category Filter Dropdown - Desktop */}
                 <div className="flex items-center">
                  <label htmlFor="category" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category:
                  </label>
                  <select
                    id="category"
                    value={selectedCategory} // Use category slug value
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    disabled={loadingCategories} // Disable while loading
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 disabled:opacity-50"
                  >
                    <option value="All">All Categories</option>
                    {availableCategories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}> 
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Level Filter Dropdown - Desktop */}
                <div className="flex items-center">
                  <label htmlFor="level" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level:
                  </label>
                  <select
                    id="level"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <motion.div
              initial={false}
              animate={{
                height: showFilters ? 'auto' : 0,
                opacity: showFilters ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                {/* Category Filter Dropdown - Mobile */}
                 <div>
                  <label
                    htmlFor="mobile-category"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Category:
                  </label>
                  <select
                    id="mobile-category"
                    value={selectedCategory} // Use category slug
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    disabled={loadingCategories}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 disabled:opacity-50"
                  >
                     <option value="All">All Categories</option>
                    {availableCategories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter Dropdown - Mobile */}
                <div>
                  <label
                    htmlFor="mobile-level"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Level:
                  </label>
                  <select
                    id="mobile-level"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600 dark:text-red-400">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Showing {filteredCourses.length}{' '}
                {filteredCourses.length === 1 ? 'course' : 'courses'}
              </p>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => {
                    // Updated mapping to include fetched rating and students
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
                        // Use fetched rating/students or default to 0
                        students: course.students ?? 0,
                        rating: course.rating ?? 0,
                        category: 'General',
                        tags: [],
                    };
                    return (
                      <Link key={course._id} to={`/courses/${course.slug.current}`}>
                        <CourseCard
                            index={index}
                            course={courseCardProps}
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 text-gray-400 dark:text-gray-500"
                  >
                    <SearchIcon size={48} className="mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No courses found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedLevel('All');
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;