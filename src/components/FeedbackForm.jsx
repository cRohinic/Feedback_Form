import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Frown, Meh, Smile, ThumbsUp, Heart } from 'lucide-react';

const FeedbackForm = () => {
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      email: '',
      rating: 3,
      comment: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      contact: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      rating: Yup.number().min(1).max(5).required('Required'),
      comment: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      setFeedbackHistory([...feedbackHistory, values]);
      resetForm(); 
    },
  });

  const ratingEmojis = [
    { icon: <Frown className="w-8 h-8 text-red-500" />, color: 'text-red-500', label: 'Worst' },
    { icon: <Meh className="w-8 h-8 text-orange-500" />, color: 'text-orange-500', label: 'Not good' },
    { icon: <Smile className="w-8 h-8 text-yellow-500" />, color: 'text-yellow-500', label: 'Fine' },
    { icon: <ThumbsUp className="w-8 h-8 text-green-500" />, color: 'text-green-500', label: 'Good' },
    { icon: <Heart className="w-8 h-8 text-pink-500" />, color: 'text-pink-500', label: 'Excellent' },
  ];

  const getSliderColor = (rating) => {
    switch (rating) {
      case 1:
        return '#f56565'; 
      case 2:
        return '#ed8936'; 
      case 3:
        return '#ecc94b'; 
      case 4:
        return '#48bb78'; 
      case 5:
        return '#ed64a6'; 
      default:
        return '#ecc94b'; 
    }
  };

  const emojiSlider = (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {ratingEmojis.map((emoji, index) => (
          <div key={index} className="flex flex-col items-center">
            {emoji.icon}
            <span className={`text-xs mt-1 ${emoji.color}`}>{emoji.label}</span>
          </div>
        ))}
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={formik.values.rating}
        onChange={formik.handleChange}
        name="rating"
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${getSliderColor(formik.values.rating)} ${((formik.values.rating - 1) / 4) * 100}%, #e2e8f0 0%)`,
        }}
      />
    </div>
  );

  const FeedbackDetails = () => (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-bold mb-4 text-blue-700">Submitted Feedbacks</h3>
      {feedbackHistory.length > 0 ? (
        <ul className="space-y-4">
          {feedbackHistory.map((feedback, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {ratingEmojis[feedback.rating - 1].icon}
                {ratingEmojis[feedback.rating - 1].label}
              </div>
              <div>
                <p className="text-blue-700 font-bold">{feedback.comment}</p>
                <p className="font-medium text-blue-800">{feedback.name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback submitted yet.</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Feedback Form</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-blue-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600 text-sm">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact" className="block text-sm font-medium text-blue-700">
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="tel"
                  {...formik.getFieldProps('contact')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {formik.touched.contact && formik.errors.contact ? (
                  <div className="text-red-600 text-sm">{formik.errors.contact}</div>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="rating" className="block text-sm font-medium text-blue-700">
                Share your experience
              </label>
              {emojiSlider}
              {formik.touched.rating && formik.errors.rating ? (
                <div className="text-red-600 text-sm">{formik.errors.rating}</div>
              ) : null}
            </div>

            <div className="space-y-2">
              <textarea
                id="comment"
                {...formik.getFieldProps('comment')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
                placeholder="Add your comments..."
              ></textarea>
              {formik.touched.comment && formik.errors.comment ? (
                <div className="text-red-600 text-sm">{formik.errors.comment}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
            >
              Submit 
            </button>
          </form>
        </div>
        <FeedbackDetails />
      </div>
    </div>
  );
};

export default FeedbackForm;