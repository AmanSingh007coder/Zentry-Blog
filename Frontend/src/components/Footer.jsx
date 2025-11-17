import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#0F1321]/90 text-slate-300 border-t border-purple-800/40 backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-serif text-white">zentry</h2>
        <p className="text-sm text-slate-400 max-w-xs">
          A place for insightful articles on technology, travel, and personal growth.  
          Join our community and share your story.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Pages</h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li><Link to="/home" className="hover:text-orange-400 transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-orange-400 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
          <li><Link to="/create-blog" className="hover:text-orange-400 transition">Create Post</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Connect</h3>
        <div className="mt-3 flex space-x-5">
          <a href="https://github.com/AmanSingh007coder" className="hover:text-orange-400 transition"><FiGithub className="w-6 h-6" /></a>
          <a href="https://www.linkedin.com/in/aman-kumar-singh-be/" className="hover:text-orange-400 transition"><FiLinkedin className="w-6 h-6" /></a>
          <a href="mailto:amansinghrajput1610@gmail.com" className="hover:text-orange-400 transition"><FiMail className="w-6 h-6" /></a>
          <a href="https://www.instagram.com/itz_aman_rajput_007/" className="hover:text-orange-400 transition"><FiInstagram className="w-6 h-6" /></a>
        </div>
      </div>

    </div>

    <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
      <p>&copy; {new Date().getFullYear()} Zentry.in — All rights reserved.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;