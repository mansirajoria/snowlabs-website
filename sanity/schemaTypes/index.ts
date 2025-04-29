import category from '../schemas/category'
import course from '../schemas/course'
// Import the new resource-related schemas
// Removed generic resource schema
import blog from '../schemas/blog'
import interviewQuestion from '../schemas/interviewQuestion' // Object type
// import interviewQuestionsPage from '../schemas/interviewQuestionsPage' // Replaced by Set
import interviewQuestionSet from '../schemas/interviewQuestionSet' // Document type for sets of questions
import mockTest from '../schemas/mockTest'
import mockTestQuestion from '../schemas/mockTestQuestion' // Object type
import webinar from '../schemas/webinar' // Import the new webinar schema
import testimonial from '../schemas/testimonial' // Import the new testimonial schema

export const schemaTypes = [
    // Existing schemas
    course, 
    category, 
    // Add new schemas
    // Removed generic resource
    blog, // Specific blog schema (Document)
    mockTest, // Specific mock test schema (Document)
    // interviewQuestionsPage, // Replaced by Set
    interviewQuestionSet, // Specific Interview Qs set schema (Document)
    webinar, // Add webinar to the exported array
    testimonial, // Add testimonial schema
    // Object types used within other schemas
    interviewQuestion, 
    mockTestQuestion, 
]
