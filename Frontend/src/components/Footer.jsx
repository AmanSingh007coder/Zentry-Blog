import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h2 className="md:text-3xl text-2xl font-bold font-serif text-white">Zentry.in</h2>
            <p className="text-sm text-slate-400 max-w-xs">
              A place for insightful articles on technology, travel, and personal growth. Join our community and share your story.
            </p>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Pages</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/create-blog" className="hover:text-white transition-colors">Create a Post</Link></li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Connect</h3>
            <div className="mt-3 flex space-x-6">
              <a href="https://github.com/AmanSingh007coder" target="_blank" rel="noopener noreferrer" aria-label="Github" className="text-slate-400 hover:text-orange-500 p-3 bg-slate-700 rounded-full transition-colors">
                <FiGithub className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/aman-kumar-singh-be/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-orange-500 p-3 bg-slate-700 rounded-full transition-colors">
                <FiLinkedin className="w-6 h-6" />
              </a>
                 <a href="mailto:amansinghrajput1610@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="E-mail" className="text-slate-400 hover:text-orange-500 p-3 bg-slate-700 rounded-full transition-colors">
                <FiMail className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/itz_aman_rajput_007/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-orange-500 p-3 bg-slate-700 rounded-full transition-colors">
                <FiInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Zentry.in All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;