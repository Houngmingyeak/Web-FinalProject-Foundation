//src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { db, storage } from "../firebase/config";
import { z } from "zod";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../components/ui/avatar";

import { FiEdit2, FiSave, FiCamera } from "react-icons/fi";
import { Link } from "react-router-dom";

// Zod validation schemas
const profileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s]+$/, "Name can only contain letters, numbers, and spaces"),
  bio: z
    .string()
    .max(200, "Bio must be less than 200 characters")
    .optional()
    .default(""),
});

const avatarSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, "Image must be less than 5MB"),
  type: z.string().regex(/^image\/(jpeg|png|gif|webp)$/, "Only JPEG, PNG, GIF, and WEBP images are allowed"),
});

export default function ProfilePage() {
  const { currentUser, userProfile, logout, loading: authLoading } = useAuth();

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [userQuestions, setUserQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

    // Cloudinary config – replace with your own!
  const CLOUD_NAME = "dkpvix2rd";        // from Cloudinary dashboard
  const UPLOAD_PRESET = "mind_stack";  // from upload preset settings

    // Helper to format dates
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  }; 

  // Load profile data
  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName);
      setBio(userProfile.bio || "");
      setAvatarPreview(userProfile.avatar || null);
    }
  }, [userProfile]);

  // Load user content
  useEffect(() => {
    const fetchUserContent = async () => {
      if (!currentUser) return;

      const qSnap = await getDocs(
        query(
          collection(db, "questions"),
          where("authorId", "==", currentUser.uid)
        )
      );

      setUserQuestions(qSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const aSnap = await getDocs(
        query(
          collection(db, "answers"),
          where("authorId", "==", currentUser.uid)
        )
      );

      setUserAnswers(aSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    fetchUserContent();
  }, [currentUser]);

  // Upload image to Cloudinary and return URL
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // the HTTPS URL of the uploaded image
  };

  // Handle avatar change with validation
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validate avatar
      avatarSchema.parse({
        size: file.size,
        type: file.type,
      });

      setAvatarFile(file);
      setErrors(prev => ({ ...prev, avatar: null }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, avatar: error.errors[0].message }));
      }
    }
  };

  // Validate form before submission
  const validateForm = () => {
    try {
      profileSchema.parse({ displayName, bio });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    if (!currentUser || !validateForm()) return;

    setLoading(true);

    try {
      let avatarUrl = userProfile?.avatar;

      // Upload new avatar if selected
            // Upload new avatar if selected
      if (avatarFile) {
        avatarUrl = await uploadToCloudinary(avatarFile);
      }

      // Update user document
      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName: displayName.trim(),
        bio: bio.trim(),
        avatar: avatarUrl,
        updatedAt: new Date().toISOString(),
      });

      setEditing(false);
      setAvatarFile(null);
      setErrors({});
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: "Failed to update profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditing(false);
    setDisplayName(userProfile.displayName);
    setBio(userProfile.bio || "");
    setAvatarPreview(userProfile.avatar || null);
    setAvatarFile(null);
    setErrors({});
  };

  // Prevent rendering if data isn't ready
  if (authLoading || !userProfile) {
    return <div className="text-center py-20 text-white">Loading user data...</div>;
  }

  // Avatar initials
  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 ">
        {/* PROFILE HEADER */}
        <Card className="p-6 rounded-2xl shadow-sm border bg-white mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative ">
              <Avatar className="w-28 h-28 rounded-full overflow-hidden">
                <AvatarImage src={avatarPreview} className="object-cover w-28 h-28" />
                {/* name under img */}
                {/* <AvatarFallback className="text-xl font-bold text-center bg-indigo-100 text-indigo-600 "> */}
                  {/* {getInitials(displayName || "User")} */}
                {/* </AvatarFallback> */}
              </Avatar>
              
              {editing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 bg-sky-300 text-white p-1.5 rounded-full cursor-pointer hover:bg-cyan-300 transition-colors"
                >
                  <FiCamera className="w-4 h-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={loading}
                  />
                </label>
              )}
            </div>

            <div className="flex-1">
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={`text-2xl font-bold w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                        errors.displayName ? "border-red-500" : ""
                      }`}
                      placeholder="Your name"
                      disabled={loading}
                    />
                    {errors.displayName && (
                      <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-gray-900 ${
                        errors.bio ? "border-red-500" : ""
                      }`}
                      disabled={loading}
                      maxLength={200}
                    />
                    <div className="flex justify-between">
                      {errors.bio && (
                        <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
                      )}
                      <p className="text-gray-400 text-xs mt-1 ml-auto">
                        {bio.length}/200
                      </p>
                    </div>
                  </div>

                  {errors.avatar && (
                    <p className="text-red-500 text-xs">{errors.avatar}</p>
                  )}
                  {errors.submit && (
                    <p className="text-red-500 text-sm">{errors.submit}</p>
                  )}
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userProfile?.displayName}
                  </h1>

                  <p className="text-gray-500 text-sm">
                    {userProfile?.email}
                  </p>

                  {bio && (
                    <p className="text-sm mt-2 text-gray-700">{bio}</p>
                  )}
                  {/* Date info */}
                  <div className="mt-2 space-y-0.5">
                    {userProfile?.createdAt && (
                      <p className="text-xs text-gray-400">
                        Joined: {formatDate(userProfile.createdAt)}
                      </p>
                    )}
                    {userProfile?.lastLoginAt && (
                      <p className="text-xs text-gray-400">
                        Last active: {formatDate(userProfile.lastLoginAt)}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {editing ? (
              <div className="flex gap-2 ">
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateProfile} disabled={loading}>
                  <FiSave className="mr-2" /> {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setEditing(true)}
                className="bg-cyan-200 pr-3 h-13"
              >
                <FiEdit2 className="" /> Edit
              </Button>
            )}
          </div>

          {/* LEVEL BAR */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Level 12</span>
              <span>720 / 1000 XP</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
          </div>
        </Card>

        {/* BADGES */}
        <Card className="p-6 rounded-2xl shadow-sm border bg-white mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Badges</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <BadgeBox value="3" label="Gold" color="amber" />
            <BadgeBox value="8" label="Silver" color="gray" />
            <BadgeBox value="15" label="Bronze" color="orange" />
          </div>
        </Card>

        {/* STATS */}
        <Card className="p-6 rounded-2xl shadow-sm border bg-white mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Stats</h2>

          <div className="grid grid-cols-4 gap-4 text-center">
            <StatBox value="4,720" label="XP Earned" />
            <StatBox value={userQuestions.length} label="Questions" />
            <StatBox value={userAnswers.length} label="Answers" />
            <StatBox value="12" label="Challenges" />
          </div>
        </Card>

        {/* QUESTIONS TAB */}
        <Card className="p-6 rounded-2xl shadow-sm border bg-white">
          <div className="flex gap-6 border-b mb-6 pb-2 text-sm font-medium">
            <span className="text-blue-600 border-b-2 border-blue-600 pb-2">
              Questions
            </span>
            <span className="text-gray-500">Answers</span>
            <span className="text-gray-500">Achievements</span>
            <span className="text-gray-500">Activity</span>
          </div>

          {userQuestions.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Questions content coming soon...
            </p>
          ) : (
            userQuestions.map((q) => (
              <Link key={q.id} to={`/question/${q.id}`}>
                <div className="p-4 rounded-lg border hover:bg-gray-50 mb-3">
                  <h3 className="font-semibold text-gray-900">{q.title}</h3>
                </div>
              </Link>
            ))
          )}
        </Card>

        {/* LOGOUT */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={logout}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

// -------- Components --------

function StatBox({ value, label }) {
  return (
    <div className="bg-gray-100 rounded-xl p-4">
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function BadgeBox({ value, label, color }) {
  const colors = {
    amber: "bg-yellow-50 text-yellow-600 border-yellow-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}