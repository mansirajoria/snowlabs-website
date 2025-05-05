import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const RefundPolicy = () => {
  return (
    <div className="w-full pt-28 pb-20 min-h-screen bg-slate-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-4xl px-4">
        <AnimatedSection className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            Refund & Reschedule Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p>Thank you for choosing SnowLabs Alliance as your learning partner!</p>
            <p>We appreciate your trust in us, and for buying our products and/or services. We strive hard to ensure that our learners have a rewarding experience while they visit our website, explore the courses, and purchase them – irrespective of the nature of the learning materials.</p>
            <p>For any kind of online purchase, there are terms and conditions governing the refund policy. When you use and/or purchase our products and/or services, you agree to our defined Privacy Policy, Terms of Use, and Refund Policy.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">For Self-Paced Learning</h2>
            <p>You can raise the refund request within 7 days of purchase of course. Money back guarantee is void if the participant has accessed more than 25% content or downloaded the E-Book. Any refund request beyond 7 days of purchasing the course will not be accepted and no refund will be provided. For the refund procedure, please refer to the "Refund Procedure" section below.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">For Virtual Instructor-Led (VILT) training</h2>
            <p>You are requested to raise the refund request before the beginning of the second session of the batch in which you are eligible to attend or after the completion of the second session of the batch. No amount would be refunded from the third session of the batch whether attended or not.</p>
            <p>Instead of the refund request, you can also raise a request for switching to another batch of the same training course or of any other course by paying the balance amount of fees, if applicable. If the other course is of less value balance amount would be kept by SnowLabs as your credit and can be used in the future for any other course opted by you after discussing with the SnowLabs management. A switching request has to be made before the third session of the batch is started, after that no request would be accepted.</p>
            <p>The eligible refund amount would be credited after deducting payment gateway charges/ transfer charges/ currency conversion charges or any other charges as may be applicable.</p>
            <p>If any batch is cancelled by SnowLabs due to instructor unavailability insufficient enrollments, or forced measures (like floods, earthquakes, national/ global pandemic, political instability, etc.), 100% of training/course fees will be refunded to the learner within 14 days.</p>
            <p>For the refund procedure, please refer to the "Refund Procedure" section below.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">For Classroom Training</h2>
            <p>You can raise a refund request 7 days before the batch begins. We may need to postpone/cancel an event because of many reasons, such as insufficient enrollments, instructor unavailability, or force majeure events (like floods, earthquakes, political instability, etc). If we cancel an event, 100% of the training/course fees will be refunded to the learner. No refund is applicable to certification exams, you can switch between other certification exams with equal value.</p>
            <p>If a cancellation is done by an attendee, 7 days (or more) before the batch begins, payment gateway charges/transfer charges/currency conversion charges will be deducted and the remaining amount will be refunded to the learner.</p>
            <p>However, the learner can request any time before the training starts for switching to another batch or any other course on payment of balance fees, if applicable. If the other course is of less value balance amount would be kept by SnowLabs as your credit and can be used in the future for any other course opted by you after discussing with the SnowLabs management.</p>
            <p>SnowLab reserves the right to revise the terms & conditions of this policy without any prior notice.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">What if a duplicate payment is made?</h2>
            <p>If a duplicate payment is made, the refund will be processed via the same source (original method of payment) within 10 business days after intimation by the customer.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Refund Procedure</h2>
            <p>Refund requests can be initiated by sending emails to the SnowLabs team at <a href="mailto:training@snowlabs.in" className="text-blue-600 hover:underline dark:text-blue-400">training@snowlabs.in</a>. A refund request usually takes a maximum of 7 business days to get approved by finance and then within 15 business days to get the payment back into the source account of the learner. We reserve the right to cancel any refund request if it does not follow the prerequisites in this regard or violates the refund rules.</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default RefundPolicy; 