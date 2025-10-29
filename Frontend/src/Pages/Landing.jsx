import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hero from '../assets/updated.png';
import AuthModal from '../components/AuthModal';
import { fetchLandingPosts } from '../api'; 
import { subscribeToNewsletter } from '../api';
import { FiCompass, FiMessageSquare, FiEdit3, FiShield, FiSmartphone, FiMail, FiGithub, FiLinkedin, FiInstagram, FiMenu } from 'react-icons/fi'; 

const LandingNavbar = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-md fixed z-40">
      <nav className="max-w-full mx-auto flex items-center justify-between p-4 sm:p-6">
        <h1 className="md:text-3xl text-2xl font-bold font-serif text-white">Zentry.in</h1>
        <ul className="hidden md:flex items-center space-x-8 text-lg text-white">
          <li><a href="#home" className="hover:text-orange-200 transition-colors">Home</a></li>
          <li><a href="#features" className="hover:text-orange-200 transition-colors">Features</a></li>
          <li><a href="#posts" className="hover:text-orange-200 transition-colors">Posts</a></li>
          <li><a href="#subscribe" className="hover:text-orange-200 transition-colors">Subscribe</a></li>
          <li><a href="#contact" className="hover:text-orange-200 transition-colors">Contact</a></li>
        </ul>

        <div className="flex items-center space-x-4">

          <div className="hidden sm:flex items-center space-x-4">
            <button onClick={() => openModal('login')} className="text-white hover:text-orange-200 font-medium transition-colors cursor-pointer">
              Sign In
            </button>
            <button onClick={() => openModal('signup')} className="bg-white text-orange-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-100 transition-colors cursor-pointer">
              Get Started
            </button>
          </div>


          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" className="text-white">
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>


      {isMenuOpen && (
        <div className="md:hidden bg-purple-50 text-slate-800 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-600">Home</a></li>
            <li><a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-600">Features</a></li>
            <li><a href="#posts" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-600">Posts</a></li>
            <li><a href="#subscribe" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-600">Subscribe</a></li>

            <li className="sm:hidden pt-4">
              <button onClick={() => { openModal('login'); setIsMenuOpen(false); }} className="font-medium text-slate-600 hover:text-orange-600">
                Sign In
              </button>
            </li>
            <li className="sm:hidden">
              <button onClick={() => { openModal('signup'); setIsMenuOpen(false); }} className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-700">
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

const HeroSection = ({ openModal }) => (
  <section id="home" className="relative min-h-screen flex items-center justify-center bg-purple-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
     

    <div aria-hidden="true" className="absolute inset-0 z-0">

      <div className="absolute top-50 left-0 -translate-x-1/2 -translate-y-1/2 w-126 h-146 bg-gradient-to-br from-purple-200 to-purple-200 rounded-full opacity-90 blur-2xl"></div>
      

      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-br from-orange-200 to-rose-200 rounded-full opacity-50 blur-3xl"></div>
    </div>
    

    <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

      <div className="text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-slate-900 tracking-tight">
          Explore the Latest Tech & Web Trends
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0">
          Stay ahead with in-depth articles, tutorials, and insights on web development, digital marketing, and tech innovations. And also be a part of our community.
        </p>
        <div className="flex justify-center md:justify-start space-x-4 pt-4">
          <button 
            onClick={() => openModal('signup')} 
            className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors shadow-lg cursor-pointer"
          >
            Get Started
          </button>
          <button className="bg-slate-200 text-black font-semibold px-6 py-3 rounded-md hover:bg-slate-300 transition-colors border border-orange-500 shadow-lg cursor-pointer">
            Learn More
          </button>
        </div>
      </div>


      <div className="hidden md:flex items-center justify-center">
          <img 
            src={hero} 
            alt="Tech and Web Trends Illustration" 
            className="w-full max-w-md lg:max-w-lg rounded-lg"
          />
      </div>

    </div>
  </section> 
);

const FeaturesSection = () => {

    const features = [
        { 
            icon: <FiCompass size={32} className="text-orange-400" />, 
            title: 'Discover Content', 
            description: 'Explore articles across various categories and use our powerful search to find exactly what you need.' 
        },
        { 
            icon: <FiMessageSquare size={32} className="text-orange-400" />, 
            title: 'Engage with Community', 
            description: 'Leave comments, save posts to your reading list, and connect with other passionate readers.' 
        },
        { 
            icon: <FiEdit3 size={32} className="text-orange-400" />, 
            title: 'Share Your Voice', 
            description: 'Create a free account to easily publish your own beautiful articles and share them with the world.' 
        },
        { 
            icon: <FiShield size={32} className="text-orange-400" />, 
            title: 'Secure & Easy Login', 
            description: 'Sign up in seconds with your Google account or a secure password. Your data is always protected.' 
        },
        { 
            icon: <FiSmartphone size={32} className="text-orange-400" />, 
            title: 'Read Anywhere', 
            description: 'Our fully responsive design ensures a beautiful and seamless reading experience on any device.' 
        },
        { 
            icon: <FiMail size={32} className="text-orange-400" />, 
            title: 'Stay Connected', 
            description: 'Subscribe to our newsletter to get the latest articles and community updates delivered to your inbox.' 
        },
    ];
    
    return (
        <section id="features" className="py-20 md:py-24 bg-purple-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              
                <h2 className="relative inline-block font-serif text-3xl font-bold text-slate-900 pb-3">
                  <span>Everything You Need To Know</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl"></span>
                </h2>
                   
                <p className="mt-4 text-lg text-slate-600">A powerful platform for readers and writers alike.</p>
                

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {features.map(feature => (
                        <div key={feature.title} className="bg-slate-50 p-8 rounded-xl shadow-lg">

                            <div className="mb-4">{feature.icon}</div>
                            <h4 className="text-2xl font-bold font-serif text-purple-900">{feature.title}</h4>
                            <p className="mt-2 text-slate-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const FeaturedPostsSection = () => {
    const [posts, setPosts] = useState([]); 

    useEffect(() => {

        const getPosts = async () => {
            const featuredPosts = await fetchLandingPosts();
            setPosts(featuredPosts);
        };
        getPosts();
    }, []);

    return (
        <section id="posts" className="py-20 md:py-24 bg-purple-50 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="relative inline-block font-serif text-3xl font-bold text-slate-900 pb-3">
                  <span>Recent Blogs</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl"></span>
                </h2>
                <p className="mt-4 text-lg text-slate-600">Check out some of our most popular articles. You will be able to create your own blog here.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map(post => (

                        <Link to={`/read-blog/${post._id}`} key={post._id} className="bg-white rounded-xl shadow-lg overflow-hidden text-left hover:shadow-2xl transition-shadow duration-300">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h4 className="text-xl font-bold font-serif">{post.title}</h4>
                                <p className="mt-2 text-slate-600 text-sm line-clamp-2">{post.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};



const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setFeedbackMessage('');

    try {
      await subscribeToNewsletter(email);
      setFeedbackMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setFeedbackMessage('Subscription failed. You may already be subscribed.');
    } finally {
      setIsSubscribing(false);
    }
  };
  
  return (
    <section id="subscribe" className="py-20 md:py-24 bg-purple-100 scroll-mt-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <h2 className="relative inline-block font-serif text-3xl font-bold text-slate-900 pb-3">
                 Become an Insider
                </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Join our newsletter to get exclusive articles, free resources, and the latest updates delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubscribe} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
            className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            type="submit"
            disabled={isSubscribing}
            className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-600 transition-colors shadow-lg disabled:bg-slate-400"
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>


        {feedbackMessage && <p className="text-center mt-4 text-sm">{feedbackMessage}</p>}
      </div>
    </section>
  );
};

const FinalCTASection = ({ openModal }) => (

  <section id="contact"className="bg-purple-50 py-20">

    <div className=" bg-orange-50 max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-8 rounded-2xl text-center text-slate-900">
      
       <h2 className="relative inline-block font-serif text-3xl font-bold text-slate-900 pb-3">
        Ready to Dive In?
                </h2>
      
      <p className="mt-4 text-lg max-w-xl mx-auto opacity-90">
        Join thousands of readers and writers on Zentry.in. Create your free account today and start your journey.
      </p>
      
      <button 
        onClick={() => openModal('signup')} 
        className="mt-8 bg-white text-white  bg-gradient-to-r from-orange-600 to-orange-400 font-semibold px-8 py-3 rounded-md text-lg hover:bg-orange-400 transition-colors shadow-lg"
      >
        Get Started Now
      </button>
      
    </div>
  </section>
);

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          

          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-serif text-white">Zentry.in</h2>
            <p className="text-sm text-slate-400 max-w-xs">
              A place for insightful articles on technology, travel, and personal growth. Join our community and share your story.
            </p>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Pages</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#posts" className="hover:text-white transition-colors">Posts</a></li>
              <li><a href="#subscribe" className="hover:text-white transition-colors">Subscribe</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
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


const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('signup'); 

  const openModal = (view) => {
    setModalView(view);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white">
      <LandingNavbar openModal={openModal} />
      <main>
        <HeroSection openModal={openModal} />
        <FeaturesSection />
        <FeaturedPostsSection />
        <NewsletterSection />
        <FinalCTASection openModal={openModal} />
        <Footer />
      </main>
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        view={modalView} 
        setView={setModalView} 
      />
    </div>
  );
};

export default Landing;