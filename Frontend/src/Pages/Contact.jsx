import { useState } from 'react';
import { sendContactMessage } from '../api';
import { FiMail, FiMapPin, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFeedbackMessage('');
    setIsError(false);

    try {
      await sendContactMessage(formData);
      setFeedbackMessage('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFeedbackMessage('Failed to send message. Please try again later.');
      setIsError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mt-24 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md p-8 md:p-12">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-orange-500">
          Get in Touch
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Have a question or want to work together? I'd love to hear from you.
        </p>
      </div>

      {/* CONTACT OPTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">

        <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
          <FiMail className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Email</h3>
          <a
            href="mailto:amansinghrajput1610@gmail.com"
            className="text-sm text-orange-600 hover:underline"
          >
            amansinghrajput1610@gmail.com
          </a>
        </div>

        <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
          <FiLinkedin className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">LinkedIn</h3>
          <p className="text-sm text-orange-600">Aman Kumar Singh</p>
        </div>

        <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
          <FiMapPin className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Location</h3>
          <p className="text-sm text-orange-600">Bengaluru, India</p>
        </div>

      </div>

      <hr className="border-slate-200 dark:border-slate-700 mb-12" />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="mt-1 w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="mt-1 w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            required
            className="mt-1 w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSending}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition disabled:bg-slate-400"
          >
            {isSending ? 'Sending…' : 'Send Message'}
          </button>
        </div>

        {feedbackMessage && (
          <p
            className={`text-center text-sm mt-3 font-medium ${
              isError ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {feedbackMessage}
          </p>
        )}

      </form>
    </div>
  );
};

export default Contact;
