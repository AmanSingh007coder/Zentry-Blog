import { useState, useEffect } from 'react';
import { fetchOnePost, fetchComments, createComment, deleteComment } from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WhatsappShareButton, LinkedinShareButton, WhatsappIcon, LinkedinIcon } from 'react-share';
import * as jwt_decode from 'jwt-decode';
import Navbar from '../components/Navbar';

const Comment = ({ comment, currentUserId, onDelete }) => {
  const date = new Date(comment.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const isAuthor = comment.author?._id === currentUserId;

  const getInitials = (name) => {
    if (!name) return '...';
    const names = name.split(' ');
    if (names.length > 1) return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex space-x-4 group bg-[#0F1525]/60 backdrop-blur-md p-4 rounded-xl border border-slate-700/40 shadow-lg shadow-cyan-500/5">
      <div className="flex-shrink-0">
        {comment.author?.avatarUrl ? (
          <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-800 text-cyan-300 flex items-center justify-center font-bold">
            {getInitials(comment.author?.name)}
          </div>
        )}
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">{comment.author?.name || '[Deleted User]'}</p>
            <p className="text-xs text-slate-400">{date}</p>
          </div>
          {isAuthor && (
            <button
              onClick={() => onDelete(comment._id)}
              className="text-slate-400 hover:text-red-500 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
        <p className="mt-2 text-slate-300">{comment.content}</p>
      </div>
    </div>
  );
};

const ReadBlog = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("User");
    if (token) {
      const decoded = jwt_decode.jwtDecode(token);
      setCurrentUser(decoded);
    }

    const getData = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          fetchOnePost(id),
          fetchComments(id)
        ]);

        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        navigate('/home');
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id, navigate]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const newC = await createComment(id, { content: newComment });
      setComments([newC, ...comments]);
      setNewComment('');
    } catch (error) {
      alert("Failed to post comment.");
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (window.confirm("Delete this comment?")) {
      try {
        await deleteComment(commentId);
        setComments(prev => prev.filter(c => c._id !== commentId));
      } catch (error) {
        alert("Failed to delete comment.");
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="mt-28 text-center text-slate-400">Loading post...</div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="mt-28 text-center text-slate-400">Post not found.</div>
      </>
    );
  }

  const displayDate = new Date(post.datecreated).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen pb-20 bg-gradient-to-b from-[#0A0B13] via-[#111628] to-[#151B2E] text-white pt-28">

        {/* Article Container */}
        <div className="md:max-w-4xl mx-auto bg-[#0F1525]/70 backdrop-blur-xl border border-slate-700/40 shadow-xl shadow-cyan-500/10 rounded-2xl overflow-hidden">

          {/* Back Button */}
          <div className="p-4">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              ← Back
            </button>
          </div>

          {/* Header Image */}
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover" />
          )}

          <div className="p-8 md:p-12">

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <p className="mt-4 text-slate-400 text-lg">{post.description}</p>

            <p className="mt-3 text-sm text-cyan-300">
              Published on {displayDate} • {post.author?.name || "Anonymous"}
            </p>

            {/* Share */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-sm text-slate-400">Share:</span>
              <WhatsappShareButton url={window.location.href} title={post.title}>
                <WhatsappIcon size={36} round />
              </WhatsappShareButton>
              <LinkedinShareButton url={window.location.href} title={post.title}>
                <LinkedinIcon size={36} round />
              </LinkedinShareButton>
            </div>

            <hr className="my-10 border-slate-700/50" />

            {/* Article Content */}
            <article
              className="prose max-w-none prose-invert prose-headings:text-cyan-300 prose-strong:text-white prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Comments */}
          <div className="p-8 md:p-12 border-t border-slate-700/40 bg-[#0D1220]/80 rounded-b-2xl">

            <h2 className="text-3xl font-bold font-serif mb-6 text-cyan-300">Comments</h2>

            {/* Add Comment */}
            {currentUser ? (
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#0A0F1A] border border-slate-700/50 text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none"
                  rows="3"
                  placeholder="Write your comment..."
                />
                <button
                  type="submit"
                  className="mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold shadow-md hover:shadow-cyan-500/30 transition"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="text-slate-400 mb-6">
                <Link to="/" className="text-cyan-300 hover:underline">Sign in</Link> to comment.
              </p>
            )}

            {/* All Comments */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <Comment
                    key={c._id}
                    comment={c}
                    currentUserId={currentUser?._id}
                    onDelete={handleCommentDelete}
                  />
                ))
              ) : (
                <p className="text-slate-500 text-center">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBlog;
