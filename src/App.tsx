import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import RefundPolicy from './pages/RefundPolicy';

// Import new resource pages
import InterviewQuestionsListPage from './pages/resources/InterviewQuestionsListPage';
import InterviewQuestionDetailPage from './pages/resources/InterviewQuestionDetailPage';
import MockTestPage from './pages/resources/MockTestPage';
import MockTestDetailPage from './pages/resources/MockTestDetailPage';
import BlogsListPage from './pages/resources/BlogsListPage';
import BlogDetailPage from './pages/resources/BlogDetailPage';
import WebinarsListPage from './pages/resources/WebinarsListPage';
import WebinarDetailPage from './pages/resources/WebinarDetailPage';

export function App() {
  return <Router>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            <Route path="/resources/interview-questions" element={<InterviewQuestionsListPage />} />
            <Route path="/resources/interview-questions/:slug" element={<InterviewQuestionDetailPage />} />
            <Route path="/resources/mock-test" element={<MockTestPage />} />
            <Route path="/resources/mock-test/:slug" element={<MockTestDetailPage />} />
            <Route path="/resources/blogs" element={<BlogsListPage />} />
            <Route path="/resources/blogs/:slug" element={<BlogDetailPage />} />

            <Route path="/resources/webinars" element={<WebinarsListPage />} />
            <Route path="/resources/webinars/:slug" element={<WebinarDetailPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>;
}