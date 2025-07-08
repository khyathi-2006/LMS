import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, BookOpen, Calendar, Download, ArrowRight } from 'lucide-react';

const BookingSuccess = () => {
  const location = useLocation();
  const { course, paymentAmount } = location.state || {};

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking information found</h2>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Registration Successful!</h1>
            <p className="text-xl text-green-100">
              Welcome to your learning journey. You're now enrolled in:
            </p>
          </div>

          {/* Course Details */}
          <div className="p-8">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-green-600">${paymentAmount} paid</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Start Learning</h4>
                  <p className="text-sm text-gray-600">
                    Access your course materials and begin your first lesson immediately.
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Set Schedule</h4>
                  <p className="text-sm text-gray-600">
                    Plan your learning schedule and set goals to stay on track.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Download className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Download Resources</h4>
                  <p className="text-sm text-gray-600">
                    Download course materials and resources for offline learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Registration Confirmation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Registration ID:</span>
                  <span className="font-medium text-gray-900 ml-2">#REG{Date.now().toString().slice(-6)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Registration Date:</span>
                  <span className="font-medium text-gray-900 ml-2">{new Date().toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900 ml-2">Credit Card</span>
                </div>
                <div>
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium text-gray-900 ml-2">${paymentAmount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                to={`/course/${course._id}`}
                className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                <BookOpen className="h-4 w-4" />
                <span>View Course</span>
              </Link>
            </div>

            {/* Support Information */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                Need help? Contact our support team at{' '}
                <a href="mailto:support@eduflow.com" className="text-blue-600 hover:text-blue-500">
                  support@eduflow.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;