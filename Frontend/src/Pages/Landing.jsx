import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import { fetchLandingPosts, subscribeToNewsletter } from "../api";
import {
  FiCompass,
  FiMessageSquare,
  FiEdit3,
  FiShield,
  FiSmartphone,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMenu,
  FiSend,
} from "react-icons/fi";

// ================= NAVBAR =================
const LandingNavbar = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0C0F1A]/95 backdrop-blur-lg border-b border-cyan-900/30 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-cyan-400">
          zentry
        </h1>

        <ul className="hidden md:flex items-center space-x-10 text-slate-200 text-sm font-medium">
          {["Home", "Features", "Posts", "Subscribe", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="relative group transition-all"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden sm:flex items-center space-x-4">
          <button
            onClick={() => openModal("login")}
            className="text-cyan-400 hover:text-blue-400 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => openModal("signup")}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-md hover:shadow-cyan-400/40 transition"
          >
            Get Started
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Open menu"
          className="md:hidden text-cyan-400"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-[#0C0F1A] text-slate-300 border-t border-cyan-900/30 py-4">
          <ul className="flex flex-col items-center space-y-4 text-base">
            {["Home", "Features", "Posts", "Subscribe", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-cyan-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <button
                onClick={() => {
                  openModal("login");
                  setIsMenuOpen(false);
                }}
                className="text-cyan-400 hover:text-blue-400"
              >
                Sign In
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  openModal("signup");
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-lg text-white font-semibold shadow-cyan-400/30 shadow-md"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

// ================= HERO SECTION =================
const HeroSection = ({ openModal }) => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col justify-center items-center text-center bg-[#0C0F1A] text-white pt-32 pb-20 overflow-hidden"
  >
    {/* Background Glows */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[15%] left-[10%] w-[35rem] h-[35rem] bg-cyan-500/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[40rem] h-[40rem] bg-blue-600/10 blur-3xl rounded-full animate-pulse"></div>
    </div>

    <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg leading-tight">
      Learn with purpose and grow.
    </h1>

    <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl">
      Your daily dose of insights, stories, and ideas from every corner of the world.
    </p>

    <div className="flex flex-wrap justify-center gap-4 mt-10">
      <button
        onClick={() => openModal("signup")}
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition"
      >
        Start Reading
      </button>
      <button
        onClick={() => openModal("login")}
        className="px-8 py-3 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 transition"
      >
        Sign In
      </button>
    </div>
  </section>
);

// ================= FEATURES =================
const FeaturesSection = () => {
  const features = [
    {
      icon: <FiCompass size={32} className="text-cyan-400" />,
      title: "Discover Content",
      description:
        "Explore blogs across categories and find exactly what you love.",
    },
    {
      icon: <FiMessageSquare size={32} className="text-cyan-400" />,
      title: "Engage with Readers",
      description: "Comment, share, and interact with a growing community.",
    },
    {
      icon: <FiEdit3 size={32} className="text-cyan-400" />,
      title: "Create Easily",
      description:
        "Publish your stories and thoughts with a simple editor, anytime.",
    },
    {
      icon: <FiShield size={32} className="text-cyan-400" />,
      title: "Stay Secure",
      description:
        "Your account and data are always protected with end-to-end security.",
    },
    {
      icon: <FiSmartphone size={32} className="text-cyan-400" />,
      title: "Mobile Friendly",
      description:
        "Seamlessly optimized experience across all screen sizes.",
    },
    {
      icon: <FiMail size={32} className="text-cyan-400" />,
      title: "Get Updates",
      description:
        "Join the newsletter to receive new articles straight to your inbox.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0F1629] text-slate-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
          Everything You Need To Stay Inspired
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-12">
          A modern platform made for readers, thinkers, and creators.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-2xl bg-[#111827]/60 border border-cyan-900/30 shadow-md hover:shadow-cyan-400/30 transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-cyan-300 mb-2">
                {feature.title}
              </h4>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= FEATURED POSTS =================
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
    <section id="posts" className="py-24 bg-[#0C0F1A] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
          Recent Blogs
        </h2>
        <p className="text-slate-400 mb-12">
          Explore trending stories and ideas from around the world.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link
              to={`/read-blog/${post._id}`}
              key={post._id}
              className="bg-[#111827] rounded-2xl overflow-hidden border border-cyan-900/30 hover:shadow-cyan-400/30 transition-all"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h4 className="text-lg font-semibold text-cyan-300">
                  {post.title}
                </h4>
                <p className="mt-2 text-slate-400 text-sm line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= NEWSLETTER =================
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const response = await subscribeToNewsletter(email);
    setMessage(response.message);
    setEmail("");
  };

  return (
    <section id="subscribe" className="py-24 bg-[#0F1629] text-center text-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-slate-400 mb-8">
          Get updates, stories, and exclusive content directly in your inbox.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="px-5 py-3 rounded-xl bg-[#111827] border border-cyan-900/40 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 w-full sm:w-80"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-cyan-400/40 transition"
          >
            <FiSend /> Subscribe
          </button>
        </form>
        {message && (
          <p className="text-cyan-300 text-sm mt-4">{message}</p>
        )}
      </div>
    </section>
  );
};

// ================= FOOTER =================
const Footer = () => (
  <footer id="contact" className="bg-[#0C0F1A] text-slate-400 py-12 border-t border-cyan-900/30">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
      <div>
        <h3 className="text-cyan-400 font-semibold text-lg mb-2">
          Zentry.in
        </h3>
        <p className="text-slate-500">
          A place to discover, learn, and share ideas that matter.
        </p>
      </div>

      <div>
        <h3 className="text-cyan-400 font-semibold text-lg mb-2">
          Quick Links
        </h3>
        <ul className="space-y-2">
          {["Home", "Features", "Posts", "Subscribe"].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:text-cyan-300 transition"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center md:items-end justify-center space-y-3">
        <h3 className="text-cyan-400 font-semibold text-lg">Follow Us</h3>
        <div className="flex space-x-4 text-xl">
          <a href="#" className="hover:text-cyan-400 transition">
            <FiGithub />
          </a>
          <a href="#" className="hover:text-cyan-400 transition">
            <FiLinkedin />
          </a>
          <a href="#" className="hover:text-cyan-400 transition">
            <FiInstagram />
          </a>
        </div>
      </div>
    </div>

    <div className="text-center text-slate-600 text-sm mt-10">
      © {new Date().getFullYear()} Zentry.in — All Rights Reserved.
    </div>
  </footer>
);

// ================= LANDING PAGE ROOT =================
const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("signup");

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
