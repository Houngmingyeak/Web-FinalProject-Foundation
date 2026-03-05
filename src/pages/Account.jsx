import React from 'react';
import { toast } from 'react-toastify';
import { useGetProfileQuery, useUploadProfileImageMutation } from '../features/profile/profileApi';

export default function Account() {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [uploadImage, { isLoading: isUploading }] = useUploadProfileImageMutation();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ពិនិត្យប្រភេទឯកសារ
    if (!file.type.startsWith('image/')) {
      toast.error('សូមជ្រើសរើសឯកសាររូបភាពប៉ុណ្ណោះ');
      return;
    }

    try {
      await uploadImage(file).unwrap();
      toast.success('បានផ្លាស់ប្តូររូបភាពប្រវត្តិរូបដោយជោគជ័យ');
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error(err?.data?.message || 'ការផ្ទុករូបភាពបរាជ័យ');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-500">
        Error loading profile. Please try again.
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* BANNER & AVATAR */}
      <div className="relative h-48 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
        <div className="absolute -bottom-14 left-8">
          <div className="relative">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold border-4 border-white">
                {profile.displayName?.charAt(0).toUpperCase()}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer">
              {isUploading ? 'Uploading...' : 'Upload'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      </div>

      {/* USER INFO */}
      <div className="mt-20 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{profile.displayName}</h2>
          <p className="text-gray-500">{profile.email}</p>
          {profile.bio && <p className="mt-2 text-gray-600">{profile.bio}</p>}
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Edit Profile
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-6 mt-10 text-center">
        <div className="bg-gray-50 rounded-xl p-6 shadow">
          <p className="text-3xl font-bold">{profile.questions?.length || 0}</p>
          <p className="text-gray-500">Questions</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 shadow">
          <p className="text-3xl font-bold">{profile.comments?.length || 0}</p>
          <p className="text-gray-500">Comments</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 shadow">
          <p className="text-3xl font-bold">
            {profile.bookmark?.bookMarkList?.length || 0}
          </p>
          <p className="text-gray-500">Bookmarks</p>
        </div>
      </div>

      {/* MY QUESTIONS LIST */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6">My Questions</h3>
        {profile.questions?.length === 0 ? (
          <p className="text-gray-500">No questions yet</p>
        ) : (
          <div className="space-y-4">
            {profile.questions?.map((q) => (
              <div key={q.id} className="border rounded-xl p-4 hover:shadow-md transition">
                <h4 className="font-semibold text-lg">{q.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  👁 {q.viewCount} views • ⭐ {q.score}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTIVITY TIMELINE */}
      <div className="mt-14">
        <h3 className="text-xl font-bold mb-6">Activity</h3>
        <div className="space-y-4">
          {profile.questions?.slice(0, 5).map((q) => (
            <div key={q.id} className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Posted question</p>
                <p className="text-gray-600 text-sm">{q.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}