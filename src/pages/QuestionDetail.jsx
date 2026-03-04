import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, fetchAnswersByQuestionId, createPost, resetCreateState } from '../features/auth/authSlice';
import { formatDistanceToNow } from 'date-fns';
import { FiArrowLeft, FiSun, FiHeart, FiCopy, FiMessageCircle, FiEye } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth); // Assuming auth slice has user
  const { currentPost, answers, loading, error, answersLoading, answersError } = useSelector((state) => state.posts);
  const [answerContent, setAnswerContent] = useState('');
  const [answerCode, setAnswerCode] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [localError, setLocalError] = useState('');

  // For lamps and favorites - using local state for UI only (no backend)
  const [userLamps, setUserLamps] = useState(new Set());
  const [userFavorites, setUserFavorites] = useState(new Set());

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
      dispatch(fetchAnswersByQuestionId(id));
    }
  }, [id, dispatch]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please log in to post an answer');
      return;
    }
    if (!answerContent.trim()) {
      setLocalError('Answer cannot be empty');
      return;
    }

    setSubmittingAnswer(true);
    setLocalError('');

    try {
      // Create answer as a post with parentId = question id
      await dispatch(createPost({
        title: '', // Answers might not have title
        body: answerContent.trim(),
        postTypeId: 2, // Assuming 2 for answer
        parentId: parseInt(id),
        tagIds: [],
        code: answerCode.trim() || undefined,
      })).unwrap();

      toast.success('Answer posted successfully!');
      setAnswerContent('');
      setAnswerCode('');
      // Refresh answers
      dispatch(fetchAnswersByQuestionId(id));
    } catch (err) {
      setLocalError(err.message || 'Failed to post answer');
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const handleLamp = (answerId) => {
    if (!currentUser) {
      toast.error('Please log in to add a lamp');
      return;
    }
    // Toggle local state (UI only)
    setUserLamps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(answerId)) {
        newSet.delete(answerId);
      } else {
        newSet.add(answerId);
      }
      return newSet;
    });
  };

  const handleFavorite = (answerId) => {
    if (!currentUser) {
      toast.error('Please log in to save favorites');
      return;
    }
    // Toggle local state (UI only)
    setUserFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(answerId)) {
        newSet.delete(answerId);
      } else {
        newSet.add(answerId);
      }
      return newSet;
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-950">Loading...</div>;
  }

  if (error || !currentPost) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Question not found</p>
          <Link to="/" className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg">
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-6">
          <FiArrowLeft size={18} />
          Back to Questions
        </Link>

        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-white flex-1">{currentPost.title}</h1>
            {/* Status not available from API, maybe remove or derive */}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {currentPost.tagResponses?.map((tag) => (
              <span key={tag.id} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700">
                {tag.tagName}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-400 mb-6">
            Asked by <span className="font-semibold text-gray-300">{currentPost.ownerDisplayName}</span> •{' '}
            {formatDistanceToNow(new Date(currentPost.creationDate), { addSuffix: true })} • {currentPost.viewCount} views
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="whitespace-pre-wrap text-gray-300">{currentPost.body}</p>
            {/* Code might be separate field? Not in API, so omit */}
          </div>
        </div>

        {/* Answers Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white">{answers?.length || 0} Answers</h2>

          {answersLoading && <p>Loading answers...</p>}
          {answersError && <p className="text-red-500">Error loading answers</p>}

          <div className="space-y-6">
            {answers?.map((answer) => (
              <div key={answer.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleLamp(answer.id)}
                      className={`flex flex-col items-center gap-1 px-2 py-2 rounded transition ${
                        userLamps.has(answer.id)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                      title="Mark as helpful"
                    >
                      <FiSun size={20} />
                      <span className="text-xs font-semibold">{answer.score || 0}</span>
                    </button>
                    <button
                      onClick={() => handleFavorite(answer.id)}
                      className={`flex flex-col items-center gap-1 px-2 py-2 rounded transition ${
                        userFavorites.has(answer.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                      title="Save to favorites"
                    >
                      <FiHeart size={20} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="prose prose-invert max-w-none mb-4">
                      <p className="whitespace-pre-wrap text-gray-300">{answer.body}</p>
                      {/* Code not separate in API */}
                    </div>

                    <div className="text-sm text-gray-400">
                      Answered by <span className="font-semibold text-gray-300">{answer.ownerDisplayName}</span> •{' '}
                      {formatDistanceToNow(new Date(answer.creationDate), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post Answer Section */}
        {currentUser ? (
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-6 text-white">Your Answer</h2>

            {localError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {localError}
              </div>
            )}

            <form onSubmit={handlePostAnswer} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Solution</label>
                <textarea
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                  placeholder="Share your solution..."
                  className="w-full min-h-32 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={submittingAnswer}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Code (Optional)</label>
                <textarea
                  value={answerCode}
                  onChange={(e) => setAnswerCode(e.target.value)}
                  placeholder="Paste your code here..."
                  className="w-full min-h-24 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={submittingAnswer}
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submittingAnswer}
              >
                {submittingAnswer ? 'Posting...' : 'Post Answer'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-center">
            <p className="text-gray-400 mb-4">Sign in to post an answer</p>
            <Link 
              to="/login" 
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}