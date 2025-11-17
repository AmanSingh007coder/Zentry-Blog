import CreateUser from "../Pages/CreateUser";
import Login from "../Pages/Login";

const AuthModal = ({ isOpen, onClose, view, setView }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#0C0F1A] border border-cyan-900/40 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.2)] p-8 w-full max-w-md text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-cyan-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Dynamic Content */}
        {view === "signup" ? (
          <CreateUser setView={setView} />
        ) : (
          <Login setView={setView} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
