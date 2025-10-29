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
    <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mt-24">
      <div className="text-center mb-12">
        <h1 
    className="inline-block bg-gradient-to-r from-blue-400 to-pink-400 text-white 
               px-6 py-2 md:px-10 md:py-3 
               text-2xl md:text-4xl 
               font-bold font-serif 
               rounded-full shadow-lg"
  >
    Get in Touch
  </h1>
        <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
          Have a question or want to work together? I'd love to hear from you.
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 text-center">

        <div className="p-6 bg-slate-200 rounded-lg shadow-inner">
          <FiMail className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-800">Email Me</h3>
          <a href="mailto:amansinghrajput1610@gmail.com" className="text-sm text-purple-500 hover:underline">amansinghrajput1610@gmail.com</a>
        </div>

        <div className="p-6 bg-slate-200 rounded-lg shadow-inner">
          <FiLinkedin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-800">Find Me Online</h3>
          <p className="text-sm text-purple-500 hover:underline">Aman Kumar Singh</p>
        </div>

        <div className="p-6 bg-slate-200 rounded-lg shadow-inner">
          <FiMapPin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-800">Location</h3>
          <p className="text-sm text-purple-500">Bengaluru, India</p>
        </div>
      </div>


      <hr className="border-t border-slate-200 mb-12" />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
          <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required placeholder="Your message..." className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="text-right">
          <button type="submit" disabled={isSending} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:bg-slate-400">
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
        {feedbackMessage && (
          <p className={`text-center mt-4 text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {feedbackMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;