import { useState, useEffect } from 'react';
import { fetchOnePost, fetchComments, createComment, deleteComment } from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WhatsappShareButton, LinkedinShareButton, WhatsappIcon, LinkedinIcon } from 'react-share';
import * as jwt_decode from 'jwt-decode';


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
    <div className="flex space-x-4 group">

      <div className="flex-shrink-0">
        {comment.author?.avatarUrl ? (
          <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
            {getInitials(comment.author?.name)}
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">{comment.author?.name || '[Deleted User]'}</p>
            <p className="text-sm text-slate-500">{date}</p>
          </div>
          {isAuthor && (
            <button 
              onClick={() => onDelete(comment._id)}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition-opacity"
              aria-label="Delete comment"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          )}
        </div>
        <p className="mt-2 text-slate-700">{comment.content}</p>
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

    const getPostAndComments = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          fetchOnePost(id),
          fetchComments(id)
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error("Failed to fetch post or comments", error);
        navigate('/home');
      } finally {
        setIsLoading(false);
      }
    };
    getPostAndComments();
  }, [id, navigate]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const newlyCreatedComment = await createComment(id, { content: newComment });
      setComments([newlyCreatedComment, ...comments]);
      setNewComment('');
    } catch (error) {
      alert("Failed to post comment. Please try again.");
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(commentId);
        setComments(currentComments => currentComments.filter(c => c._id !== commentId));
      } catch (error) {
        alert("Failed to delete comment.");
      }
    }
  };

  const displayDate = post?.datecreated 
    ? new Date(post.datecreated).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : '';

  const shareUrl = window.location.href;

  if (isLoading) {
    return <div className="text-center text-slate-500 py-10 mt-24">Loading post...</div>;
  }

  if (!post) {
    return <div className="text-center text-slate-500 py-10 mt-24">Post not found.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-24 mx-auto max-w-4xl">

      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
      )}

      <div className="p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-500">{post.description}</p>
          <div className="mt-6 text-sm text-orange-400">
            <span>Published on {displayDate} by {post.author?.name || 'Anonymous'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-10">
          <p className="text-sm font-semibold text-purple-900">Share this post:</p>
          <WhatsappShareButton url={shareUrl} title={post.title}><WhatsappIcon size={32} round /></WhatsappShareButton>
          <LinkedinShareButton url={shareUrl} title={post.title}><LinkedinIcon size={32} round /></LinkedinShareButton>
        </div>

        <hr className="my-8 border-slate-200" />
        
        <article className="prose prose-lg max-w-none prose-slate" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>


      <div className="p-8 md:p-12 border-t border-slate-200 bg-slate-100 rounded-b-xl">
        <h2 className="text-3xl font-bold font-serif mb-6">Comments ({comments.length})</h2>
        

        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              rows="3"
              className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-slate-400"
              disabled={!newComment.trim()}
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="text-center p-4 border border-dashed rounded-lg">
            <p className="text-slate-500">
              <Link to="/" className="font-semibold text-indigo-600 hover:underline">Sign in</Link> to leave a comment.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map(comment => 
              <Comment 
                key={comment._id} 
                comment={comment}
                currentUserId={currentUser?._id}
                onDelete={handleCommentDelete}
              />
            )
          ) : (
            !currentUser && <p className="text-slate-500 text-center py-4">No comments yet.</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-100">
        <button onClick={() => navigate(-1)} className="text-sm font-semibold bg-orange-400 p-3 rounded-full hover:bg-indigo-700 text-white transition-colors">
          &larr; Back to all posts
        </button>
      </div>
    </div>
  );
};

export default ReadBlog;