import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../features/auth/authSlice';
import {
  useGetProfileQuery,
  useUploadProfileImageMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} from '../features/profile/profileApi';
import { useGetBookmarksQuery } from '../features/bookmark/bookmarkApi';
import { useAuthImage } from '../hooks/useAuthImage';
import { formatDistanceToNow, format } from 'date-fns';
import {
  FiEdit2, FiCamera, FiMessageSquare, FiHelpCircle, FiBookmark,
  FiActivity, FiEye, FiStar, FiClock, FiX, FiUploadCloud,
  FiThumbsUp, FiThumbsDown, FiLogOut, FiAward, FiCalendar,
  FiUser, FiMail, FiShield, FiTrendingUp, FiExternalLink,
  FiTag, FiCheck, FiLock, FiEyeOff, FiKey,
} from 'react-icons/fi';
import Sidebar from '../layout/Sidebar';

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color, bg, border }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border ${border} p-5 flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-0.5 group`}>
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-black text-gray-900 dark:text-white">{value ?? 0}</p>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}

// ── Question Row ───────────────────────────────────────────────────────────
function QuestionRow({ q }) {
  return (
    <Link to={`/question/${q.id}`} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-transparent hover:border-blue-100 dark:hover:border-blue-800 transition-all">
      <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
          <FiStar className="w-3 h-3" />{q.score ?? 0}
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <FiEye className="w-3 h-3" />{q.viewCount ?? 0}
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <FiMessageSquare className="w-3 h-3" />{q.comments?.length ?? 0}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1.5">
          {q.title}
        </p>
        {q.tagResponses?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {q.tagResponses.slice(0, 3).map((t) => (
              <span key={t.id} className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                <FiTag className="w-2.5 h-2.5" />{t.tagName}
              </span>
            ))}
          </div>
        )}
        <p className="text-[11px] text-slate-400 flex items-center gap-1">
          <FiClock className="w-3 h-3" />
          {q.creationDate ? formatDistanceToNow(new Date(q.creationDate), { addSuffix: true }) : 'Recently'}
        </p>
      </div>
      <FiExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-400 shrink-0 mt-1 transition-colors" />
    </Link>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-3 pt-4">
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/4 bg-gray-100 dark:bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-700 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white dark:bg-gray-800 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [uploadImage, { isLoading: isUploading }] = useUploadProfileImageMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [updatePassword, { isLoading: isChangingPw }] = useUpdatePasswordMutation();
  const { data: bookmarks = [] } = useGetBookmarksQuery();


  let profilImageSplit = profile?.profileImage;

  console.log("Profile Image URL from API:", profilImageSplit);

  if (profilImageSplit?.includes("localhost:8070")) {
    profilImageSplit = profilImageSplit.replace(
      "http://localhost:8070/api/v1/profile-images", "https://forum-istad-api.cheat.casa/api/v1/media");
  }

  console.log("Profile Image Split:", profilImageSplit);

  const avatarSrc = useAuthImage(profilImageSplit);

  const [activeTab, setActiveTab] = useState('questions');
  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isPwOpen, setIsPwOpen] = useState(false);
  const [formData, setFormData] = useState({ displayName: '', bio: '' });
  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmedNewPassword: '' });
  const [showPw, setShowPw] = useState({ old: false, new: false, confirm: false });

  // Avatar upload state
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (profile) setFormData({ displayName: profile.displayName || '', bio: profile.bio || '' });
  }, [profile]);

  // ── File helpers ──
  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  const closeAvatarModal = () => { setIsAvatarOpen(false); setPreviewImage(null); setSelectedFile(null); setIsDragging(false); };

  // ── Handlers ──
  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await uploadImage(selectedFile).unwrap();
      toast.success('Profile photo updated! ✨');
      closeAvatarModal();
    } catch (err) { toast.error(err?.data?.message || 'Upload failed'); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ username: formData.displayName, bio: formData.bio }).unwrap();
      toast.success('Profile saved! 🚀');
      setIsEditing(false);
    } catch (err) { toast.error(err?.data?.message || 'Update failed'); }
  };

  const closePwModal = () => {
    setIsPwOpen(false);
    setPwForm({ oldPassword: '', newPassword: '', confirmedNewPassword: '' });
    setShowPw({ old: false, new: false, confirm: false });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmedNewPassword } = pwForm;
    if (!oldPassword || !newPassword || !confirmedNewPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmedNewPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await updatePassword({ oldPassword, newPassword, confirmedNewPassword }).unwrap();
      toast.success('Password changed successfully! 🔒');
      closePwModal();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to change password. Check your current password.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logged out');
    navigate('/login');
  };

  if (isLoading) return <PageSkeleton />;
  if (error || !profile) return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">👾</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Couldn't load profile</h2>
          <button onClick={() => window.location.reload()} className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  const questions = profile.questions ?? [];
  const comments = profile.comments ?? [];
  const savedCount = bookmarks.length;
  const memberSince = profile.creationDate ? format(new Date(profile.creationDate), 'MMM yyyy') : '—';
  const lastActive = profile.lastAccessDate ? formatDistanceToNow(new Date(profile.lastAccessDate), { addSuffix: true }) : '—';

  const tabs = [
    { id: 'questions', label: 'Questions', count: questions.length, icon: FiHelpCircle },
    { id: 'activity', label: 'Activity', count: comments.length, icon: FiActivity },
    { id: 'bookmarks', label: 'Saved', count: savedCount, icon: FiBookmark },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">

        {/* ── Hero banner ──────────────────────────────── */}
        <div className="relative h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,white,transparent)]" />
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute top-4 right-32 w-20 h-20 rounded-full bg-white/5" />
          {/* Logout button top-right */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all"
          >
            <FiLogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>

        {/* ── Main Content (lifted above banner) ───────── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 pb-12">

          {/* ── Profile Card ──────────────────────────── */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg shadow-blue-500/10 p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">

              {/* Avatar */}
              <div className="relative group shrink-0 -mt-14 mx-auto sm:mx-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-xl">
                  <div className="relative w-full h-full">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-violet-600 text-white text-3xl font-black">
                        {profile.displayName?.charAt(0).toUpperCase() ?? 'U'}
                      </div>
                    )}
                    {/* hover overlay */}
                    <button
                      onClick={() => setIsAvatarOpen(true)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <FiCamera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
                {/* online dot */}
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {profile.displayName}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <FiMail className="w-3.5 h-3.5" /> {profile.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-xl leading-relaxed">
                  {profile.bio || <span className="italic text-gray-400 dark:text-gray-500">No bio yet. Click Edit to add one.</span>}
                </p>

                {/* badges row */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
                    <FiCalendar className="w-3 h-3" /> Member since {memberSince}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800">
                    <FiShield className="w-3 h-3" /> Active {lastActive}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-800">
                    <FiAward className="w-3 h-3" /> {profile.reputation ?? 0} Reputation
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:-translate-y-0.5"
                >
                  <FiEdit2 className="w-4 h-4" /> Edit Profile
                </button>
                <button
                  onClick={() => setIsPwOpen(true)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5"
                >
                  <FiKey className="w-4 h-4" /> Change Password
                </button>
              </div>
            </div>
          </div>

          {/* ── Stats Grid ────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={FiHelpCircle} label="Questions" value={questions.length} color="text-blue-600 dark:text-blue-400" bg="bg-blue-100 dark:bg-blue-900/30" border="border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700" />
            <StatCard icon={FiMessageSquare} label="Answers" value={comments.length} color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-100 dark:bg-emerald-900/30" border="border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700" />
            <StatCard icon={FiBookmark} label="Saved" value={savedCount} color="text-amber-600 dark:text-amber-400" bg="bg-amber-100 dark:bg-amber-900/30" border="border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700" />
            <StatCard icon={FiEye} label="Profile Views" value={profile.views ?? 0} color="text-violet-600 dark:text-violet-400" bg="bg-violet-100 dark:bg-violet-900/30" border="border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700" />
          </div>

          {/* ── Vote Stats ────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <FiThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 dark:text-white">{profile.upVotes ?? 0}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Up Votes Cast</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <FiThumbsDown className="w-5 h-5 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 dark:text-white">{profile.downVotes ?? 0}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Down Votes Cast</p>
              </div>
            </div>
          </div>

          {/* ── Tabs ──────────────────────────────────── */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-bold transition-all border-b-2 -mb-px
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full
                    ${activeTab === tab.id ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* ── Tab: Questions ── */}
            {activeTab === 'questions' && (
              <div className="p-4">
                {questions.length === 0 ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-3">❓</div>
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">No questions yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Start by asking the community something.</p>
                    <Link to="/ask" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
                      Ask a Question
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50 dark:divide-gray-700/40">
                    {questions.map((q) => <QuestionRow key={q.id} q={q} />)}
                  </div>
                )}
              </div>
            )}

            {/* ── Tab: Activity (comments) ── */}
            {activeTab === 'activity' && (
              <div className="p-4">
                {comments.length === 0 ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">No answers yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Help others by answering questions.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {comments.map((c) => (
                      <Link key={c.id} to={`/question/${c.postId}`} className="group block p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-transparent hover:border-blue-100 dark:hover:border-blue-800 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                            <FiMessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {c.text}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-400 dark:text-gray-500">
                              <span className="flex items-center gap-1">
                                <FiStar className="w-3 h-3 text-amber-400" />{c.score ?? 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiClock className="w-3 h-3" />
                                {c.creationDate ? formatDistanceToNow(new Date(c.creationDate), { addSuffix: true }) : 'Recently'}
                              </span>
                            </div>
                          </div>
                          <FiExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 shrink-0 transition-colors mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Tab: Bookmarks ── */}
            {activeTab === 'bookmarks' && (
              <div className="p-4">
                {bookmarks.length === 0 ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-3">🔖</div>
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">No saved questions</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Save questions to find them here.</p>
                    <Link to="/saves" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
                      View All Saves
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50 dark:divide-gray-700/40">
                    {bookmarks.slice(0, 10).map((post) => (
                      <QuestionRow key={post.id} q={post} />
                    ))}
                    {bookmarks.length > 10 && (
                      <div className="p-4 text-center">
                        <Link to="/saves" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                          View all {bookmarks.length} saved questions →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Edit Profile Modal ──────────────────────────────────── */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                <FiEdit2 className="text-blue-500 w-4 h-4" /> Edit Profile
              </h3>
              <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
                  placeholder="Your display name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
                  placeholder="Tell the world a little about yourself…"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsEditing(false)} disabled={isUpdating}
                  className="px-5 py-2.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={isUpdating}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-60">
                  {isUpdating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</> : <><FiCheck className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Avatar Upload Modal ─────────────────────────────────── */}
      {isAvatarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                <FiCamera className="text-blue-500 w-4 h-4" /> Update Photo
              </h3>
              <button onClick={closeAvatarModal} disabled={isUploading} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center gap-5">
              {/* Preview */}
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-blue-100 dark:border-blue-900/40 shadow-md">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : avatarSrc ? (
                  <img src={avatarSrc} alt="Current" className="w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-3xl font-black opacity-60">
                    {profile.displayName?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Drop zone */}
              <label
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }}
                className={`relative w-full h-28 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all
                  ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10'}
                  ${selectedFile && !isDragging ? 'border-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}
              >
                <FiUploadCloud className={`w-7 h-7 mb-1.5 transition-colors ${isDragging || selectedFile ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {isDragging ? 'Drop it!' : selectedFile ? selectedFile.name : 'Click or drag image here'}
                </span>
                {!selectedFile && <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, WEBP (max 5MB)</span>}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => processFile(e.target.files[0])} disabled={isUploading} />
              </label>
            </div>

            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={closeAvatarModal} disabled={isUploading} className="px-4 py-2.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                Cancel
              </button>
              <button onClick={handleUpload} disabled={!selectedFile || isUploading}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
                {isUploading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading…</> : <><FiUploadCloud className="w-4 h-4" /> Upload</>}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── Change Password Modal ───────────────────────────────── */}
      {isPwOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                <FiLock className="text-amber-500 w-4 h-4" /> Change Password
              </h3>
              <button onClick={closePwModal} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleChangePassword} className="px-6 py-6 space-y-4">

              {/* Helper text */}
              <p className="text-xs text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl px-4 py-3 flex items-start gap-2">
                <FiShield className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                Enter your current password to verify your identity, then set a new password with at least 8 characters.
              </p>

              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPw.old ? 'text' : 'password'}
                    required
                    value={pwForm.oldPassword}
                    onChange={(e) => setPwForm({ ...pwForm, oldPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-11 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                    placeholder="Your current password"
                  />
                  <button type="button" onClick={() => setShowPw({ ...showPw, old: !showPw.old })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {showPw.old ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPw.new ? 'text' : 'password'}
                    required
                    value={pwForm.newPassword}
                    onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-11 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
                    placeholder="Min. 8 characters"
                  />
                  <button type="button" onClick={() => setShowPw({ ...showPw, new: !showPw.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {showPw.new ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength bar */}
                {pwForm.newPassword && (
                  <div className="mt-2">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} className={`flex-1 rounded-full transition-all ${pwForm.newPassword.length >= level * 3
                            ? level <= 1 ? 'bg-red-400'
                              : level <= 2 ? 'bg-amber-400'
                                : level <= 3 ? 'bg-blue-400'
                                  : 'bg-emerald-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                          }`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                      {pwForm.newPassword.length < 4 ? 'Too weak' : pwForm.newPassword.length < 7 ? 'Weak' : pwForm.newPassword.length < 10 ? 'Good' : 'Strong'}
                      {' '}— {pwForm.newPassword.length} characters
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPw.confirm ? 'text' : 'password'}
                    required
                    value={pwForm.confirmedNewPassword}
                    onChange={(e) => setPwForm({ ...pwForm, confirmedNewPassword: e.target.value })}
                    className={`w-full px-4 py-3 pr-11 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all
                      ${pwForm.confirmedNewPassword && pwForm.newPassword !== pwForm.confirmedNewPassword
                        ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                        : pwForm.confirmedNewPassword && pwForm.newPassword === pwForm.confirmedNewPassword
                          ? 'border-emerald-400 focus:ring-emerald-400/20 focus:border-emerald-400'
                          : 'border-gray-200 dark:border-gray-700 focus:ring-amber-400/30 focus:border-amber-400'}`}
                    placeholder="Re-enter new password"
                  />
                  <button type="button" onClick={() => setShowPw({ ...showPw, confirm: !showPw.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {showPw.confirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
                {pwForm.confirmedNewPassword && pwForm.newPassword !== pwForm.confirmedNewPassword && (
                  <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
                    <FiX className="w-3 h-3" /> Passwords do not match
                  </p>
                )}
                {pwForm.confirmedNewPassword && pwForm.newPassword === pwForm.confirmedNewPassword && (
                  <p className="text-[11px] text-emerald-500 mt-1.5 flex items-center gap-1">
                    <FiCheck className="w-3 h-3" /> Passwords match
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closePwModal} disabled={isChangingPw}
                  className="px-5 py-2.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={isChangingPw}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-60 hover:-translate-y-0.5">
                  {isChangingPw
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Updating…</>
                    : <><FiLock className="w-4 h-4" /> Update Password</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}