// src/pages/QuestionDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  increment,
  Timestamp,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import {
  FiArrowLeft,
  FiSun,
  FiHeart,
  FiCopy,
  FiMessageCircle,
  FiEye,
} from "react-icons/fi";
import { FaArrowLeftLong } from "react-icons/fa6";
import Sidebar from "../layout/Sidebar";
import AnswerForm from "../components/AnswerForm";
import AnswerCard from "../components/AnswerCard";
import QuestionCard from "../components/QuestionCard";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState("");
  const [answerCode, setAnswerCode] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [userLamps, setUserLamps] = useState(new Set());
  const [userFavorites, setUserFavorites] = useState(new Set());
  const [error, setError] = useState("");
  const [relatedQuestions, setRelatedQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // Fetch question
        const questionRef = doc(db, "questions", id);
        const questionSnap = await getDoc(questionRef);

        if (questionSnap.exists()) {
          const questionData = { id: questionSnap.id, ...questionSnap.data() };
          setQuestion(questionData);

          // Update view count
          await updateDoc(questionRef, {
            viewCount: increment(1),
          });

          // Fetch answers
          const answersRef = collection(db, "answers");
          const q = query(answersRef, where("questionId", "==", id));
          const answersSnap = await getDocs(q);
          const answersData = answersSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Sort by lamp count
          answersData.sort((a, b) => (b.lampCount || 0) - (a.lampCount || 0));
          setAnswers(answersData);

          // Fetch related questions (same tags)
          if (questionData.tags && questionData.tags.length > 0) {
            const questionsRef = collection(db, "questions");
            const relatedQuery = query(
              questionsRef,
              where("tags", "array-contains-any", questionData.tags.slice(0, 3)),
              where("__name__", "!=", id)
            );
            const relatedSnap = await getDocs(relatedQuery);
            const relatedData = relatedSnap.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .slice(0, 3);
            setRelatedQuestions(relatedData);
          }

          // Fetch user lamps and favorites
          if (currentUser) {
            const lampsSet = new Set();
            const favoritesSet = new Set();

            answersData.forEach((answer) => {
              if (answer.userLamps && answer.userLamps[currentUser.uid]) {
                lampsSet.add(answer.id);
              }
            });

            const favoritesRef = collection(db, "favorites");
            const fq = query(
              favoritesRef,
              where("userId", "==", currentUser.uid),
            );
            const favoritesSnap = await getDocs(fq);
            favoritesSnap.docs.forEach((doc) => {
              favoritesSet.add(doc.data().answerId);
            });

            setUserLamps(lampsSet);
            setUserFavorites(favoritesSet);
          }
        } else {
          setError("Question not found");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUser]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to post an answer");
      return;
    }

    if (!answerContent.trim()) {
      setError("Answer cannot be empty");
      return;
    }

    setSubmittingAnswer(true);
    setError("");

    try {
      const answersRef = collection(db, "answers");
      const newAnswer = {
        questionId: id,
        authorId: currentUser.uid,
        authorName: userProfile?.displayName || currentUser.email?.split('@')[0] || "Anonymous",
        authorAvatar: userProfile?.photoURL || null,
        content: answerContent.trim(),
        code: answerCode.trim() || "",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        comments: 0,
        lampCount: 0,
        userLamps: {},
      };

      await addDoc(answersRef, newAnswer);

      // Update question answer count
      const questionRef = doc(db, "questions", id);
      await updateDoc(questionRef, {
        answers: increment(1),
      });

      setAnswerContent("");
      setAnswerCode("");

      // Refresh answers
      const answersRef2 = collection(db, "answers");
      const q = query(answersRef2, where("questionId", "==", id));
      const answersSnap = await getDocs(q);
      const answersData = answersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      answersData.sort((a, b) => (b.lampCount || 0) - (a.lampCount || 0));
      setAnswers(answersData);
    } catch (err) {
      console.error("Error posting answer:", err);
      setError("Failed to post answer");
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const handleLamp = async (answerId) => {
    if (!currentUser) {
      alert("Please log in to add a lamp");
      return;
    }

    try {
      const answerRef = doc(db, "answers", answerId);
      const answerSnap = await getDoc(answerRef);
      const answerData = answerSnap.data();

      if (userLamps.has(answerId)) {
        // Remove lamp
        const newUserLamps = { ...answerData?.userLamps };
        delete newUserLamps[currentUser.uid];
        await updateDoc(answerRef, {
          userLamps: newUserLamps,
          lampCount: increment(-1),
        });
        setUserLamps((prev) => {
          const newSet = new Set(prev);
          newSet.delete(answerId);
          return newSet;
        });
      } else {
        // Add lamp
        await updateDoc(answerRef, {
          [`userLamps.${currentUser.uid}`]: true,
          lampCount: increment(1),
        });
        setUserLamps((prev) => new Set(prev).add(answerId));
      }

      // Refresh answers
      const answersRef = collection(db, "answers");
      const q = query(answersRef, where("questionId", "==", id));
      const answersSnap = await getDocs(q);
      const answersData = answersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      answersData.sort((a, b) => (b.lampCount || 0) - (a.lampCount || 0));
      setAnswers(answersData);
    } catch (error) {
      console.error("Error updating lamp:", error);
    }
  };

  const handleFavorite = async (answerId) => {
    if (!currentUser) {
      alert("Please log in to save favorites");
      return;
    }

    try {
      if (userFavorites.has(answerId)) {
        // Remove favorite
        const favoritesRef = collection(db, "favorites");
        const q = query(
          favoritesRef,
          where("userId", "==", currentUser.uid),
          where("answerId", "==", answerId),
        );
        const favoritesSnap = await getDocs(q);
        favoritesSnap.docs.forEach(async (doc) => {
          await doc.ref.delete();
        });
        setUserFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(answerId);
          return newSet;
        });
      } else {
        // Add favorite
        const favoritesRef = collection(db, "favorites");
        await addDoc(favoritesRef, {
          userId: currentUser.uid,
          answerId,
          questionId: id,
          addedAt: Timestamp.now(),
        });
        setUserFavorites((prev) => new Set(prev).add(answerId));
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const copyCodeToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading question...</p>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            {error || "Question not found"}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2 mb-4 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            <FaArrowLeftLong />
            Back to Questions
          </button>

          {/* Question Detail */}
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 mb-8 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex-1">
                {question.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  question.status === "open"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : question.status === "resolved"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {question.status || "Open"}
              </span>
            </div>

            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs border border-blue-100 dark:border-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span>
                Asked by{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {question.authorName || "Anonymous"}
                </span>
              </span>
              {question.createdAt && (
                <span>
                  • {formatDistanceToNow(question.createdAt.toDate(), { addSuffix: true })}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FiEye size={14} />
                {question.viewCount || 0} views
              </span>
            </div>

            {/* Description */}
            <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
              <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {question.description}
              </p>
              {question.code && (
                <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4 text-gray-200">
                  <div className="flex justify-between items-start">
                    <pre className="flex-1">{question.code}</pre>
                    <button
                      onClick={() => copyCodeToClipboard(question.code)}
                      className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                      title="Copy code"
                    >
                      <FiCopy size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Answers Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </h2>

            {answers.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No answers yet. Be the first to answer!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      {/* Voting buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleLamp(answer.id)}
                          className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition ${
                            userLamps.has(answer.id)
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                          }`}
                          title="Mark as helpful"
                        >
                          <FiSun size={20} />
                          <span className="text-xs font-semibold">
                            {answer.lampCount || 0}
                          </span>
                        </button>
                        <button
                          onClick={() => handleFavorite(answer.id)}
                          className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition ${
                            userFavorites.has(answer.id)
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                          }`}
                          title="Save to favorites"
                        >
                          <FiHeart size={20} />
                        </button>
                      </div>

                      {/* Answer content */}
                      <div className="flex-1">
                        <div className="prose prose-gray dark:prose-invert max-w-none mb-4">
                          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                            {answer.content}
                          </p>
                          {answer.code && (
                            <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                              <div className="flex justify-between items-start">
                                <pre className="flex-1 text-gray-200">
                                  {answer.code}
                                </pre>
                                <button
                                  onClick={() => copyCodeToClipboard(answer.code)}
                                  className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                                  title="Copy code"
                                >
                                  <FiCopy size={16} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Answered by{" "}
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            {answer.authorName}
                          </span>{" "}
                          • {formatDistanceToNow(answer.createdAt.toDate(), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Questions */}
          {relatedQuestions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Related Questions
              </h2>
              <div className="grid gap-4">
                {relatedQuestions.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            </div>
          )}

          {/* Post Answer Form */}
          {currentUser ? (
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Your Answer
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handlePostAnswer} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Solution
                  </label>
                  <textarea
                    value={answerContent}
                    onChange={(e) => setAnswerContent(e.target.value)}
                    placeholder="Share your solution..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                    disabled={submittingAnswer}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Code (Optional)
                  </label>
                  <textarea
                    value={answerCode}
                    onChange={(e) => setAnswerCode(e.target.value)}
                    placeholder="Paste your code here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                    disabled={submittingAnswer}
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submittingAnswer}
                >
                  {submittingAnswer ? "Posting..." : "Post Answer"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sign in to post an answer
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}