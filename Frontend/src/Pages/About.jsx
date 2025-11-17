import { Link } from "react-router-dom";
import { FiZap, FiUsers, FiEdit3 } from "react-icons/fi";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-[#0A0B13] via-[#111628] to-[#151B2E] text-white">

        {/* Header Section */}
        <div className="text-center py-16 md:py-24 bg-[#0F1525]/60 backdrop-blur-xl border-b border-slate-700/40 shadow-lg shadow-cyan-500/10">
          <h1 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            About Zentry Blog
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            A community-driven platform bringing together developers, creators, and innovators through insightful content.
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#0F1525]/70 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-slate-700/40 shadow-xl shadow-cyan-500/10">

          <div className="prose prose-lg max-w-none prose-invert prose-headings:text-cyan-300 prose-p:text-slate-300 prose-strong:text-white">

            <h2 className="font-serif">Our Story</h2>
            <p>
              Welcome to Zentry Blog — a platform crafted from a deep passion for
              modern web technologies, development trends, and digital innovation.
              Built on the MERN Stack, Zentry is designed to offer a fast, smooth,
              and intuitive reading and writing experience for every user.
            </p>

            <h2 className="font-serif">Our Mission</h2>
            <p>
              Our mission is simple: create a space where quality knowledge meets a
              vibrant community. Through tutorials, articles, and interactive features,
              we empower learners, developers, and creators to grow, share ideas, and
              connect with like-minded tech enthusiasts around the world.
            </p>
          </div>

          {/* Highlight Features */}
          <div className="not-prose my-14 space-y-10">

            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-cyan-500/20 border border-cyan-400/30">
                <FiZap className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Quality Content</h3>
                <p className="text-slate-400">
                  In-depth articles, structured tutorials, and visually rich formatting —
                  crafted to make learning modern tech accessible and enjoyable.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-blue-500/20 border border-blue-400/30">
                <FiUsers className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-300">Community Engagement</h3>
                <p className="text-slate-400">
                  Participate in discussions, comment on posts, save articles,
                  and connect with creators — a growing tech community at your fingertips.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="rounded-full p-3 bg-purple-500/20 border border-purple-400/30">
                <FiEdit3 className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-300">Empowering Creators</h3>
                <p className="text-slate-400">
                  Every voice matters. Easily create an account, upload images,
                  and publish beautifully formatted articles with our built-in editor.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-8 border-t border-slate-700/60 text-center">
            <h2 className="text-3xl font-bold font-serif text-cyan-300">
              Ready to Share Your Voice?
            </h2>
            <p className="mt-2 text-slate-400">
              Join our creator community and publish your first article today.
            </p>

            <Link
              to="/create-blog"
              className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-xl 
              shadow-lg shadow-cyan-500/30 hover:scale-105 transition duration-300"
            >
              Create a Post
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
