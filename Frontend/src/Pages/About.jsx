import { Link } from 'react-router-dom';
import { FiZap, FiUsers, FiEdit3 } from 'react-icons/fi';

const About = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-20 max-w-6xl mx-auto">
      <div className="text-center py-12 md:py-20 bg-orange-300 border-b border-slate-200">
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-slate-900">About Zentry Blog</h1>
        <p className="mt-3 text-md md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
          A community-driven platform for exploring the latest in technology and web development.
        </p>
      </div>


      <div className="p-8 md:p-12">
        <div className="prose prose-lg max-w-none prose-slate">     
          <h2>Our Story</h2>
          <p>
            Welcome to Zentry Blog, a platform born from a passion for modern web technologies and a desire to share knowledge. This project was started to create a space where developers, tech enthusiasts, and curious minds can connect, learn, and discuss the trends that shape our digital world. Our foundation is built on the MERN stack, designed to deliver a fast, responsive, and intuitive user experience from the ground up.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a platform for well-researched, insightful, and engaging content that demystifies complex subjects in technology. We believe that the best learning happens through collaboration and community. Through our articles, tutorials, and interactive features, we aim to empower every user on their personal and professional development journey, whether they are a reader, a commenter, or a creator.
          </p>

          <div className="not-prose my-12 space-y-8">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                 <FiZap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Quality Content</h3>
                <p className="text-slate-600">We are committed to delivering in-depth articles and tutorials that are both technically accurate and easy to understand, complete with rich text formatting and clear visuals.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Community Engagement</h3>
                <p className="text-slate-600">Join discussions through our interactive comment sections, save posts to your personal reading list, and connect with fellow readers and authors across the platform.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <FiEdit3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Empowering Creators</h3>
                <p className="text-slate-600">We believe everyone has a story to tell. Our platform provides the tools to create a free account, upload images, and publish beautifully formatted articles with ease.</p>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <h2 className="text-3xl font-bold font-serif text-slate-900">Ready to Share Your Voice?</h2>
          <p className="mt-2 text-slate-600">Join our community and publish your first article today.</p>
          <Link 
            to="/create-blog"
            className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold px-8 py-3 rounded-md transition-transform hover:scale-105 duration-300"
          >
            Create a Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;