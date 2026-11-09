
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

type ProfileForm = {
  name: string;
  image: string;
  phone: string;
  location: string;
  profession: string;
  website: string;
  bio: string;
};

const emptyForm: ProfileForm = {
  name: "",
  image: "",
  phone: "",
  location: "",
  profession: "",
  website: "",
  bio: "",
};

export default function ProfilePage() {
  const session = authClient.useSession();
  const user = session.data?.user;

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<ProfileForm>(emptyForm);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        image: user.image ?? "",
        phone: user.phone ?? "",
        location: user.location ?? "",
        profession: user.profession ?? "",
        website: user.website ?? "",
        bio: user.bio ?? "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({
        name: form.name,
        image: form.image || null,
        phone: form.phone,
        location: form.location,
        profession: form.profession,
        website: form.website,
        bio: form.bio,
      });

      if (error) throw new Error(error.message);

      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(
        err instanceof Error
          ? err.message
          : "Profile update failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;

    setForm({
      name: user.name ?? "",
      image: user.image ?? "",
      phone: user.phone ?? "",
      location: user.location ?? "",
      profession: user.profession ?? "",
      website: user.website ?? "",
      bio: user.bio ?? "",
    });

    setEditing(false);
    setMessage("");
  };

  const inputStyle = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${
    isDark
      ? "border-slate-700 bg-[#211e3d] text-white placeholder:text-slate-500"
      : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
  }`;

  const labelStyle = `mb-2 block text-sm font-semibold ${
    isDark ? "text-gray-200" : "text-gray-700"
  }`;

  const displayStyle = `rounded-xl p-3 break-words ${
    isDark
      ? "bg-[#211e3d] text-gray-200"
      : "bg-gray-50 text-gray-800"
  }`;

  if (session.isPending) {
    return (
      <div className={`min-h-screen p-10 ${
        isDark ? "bg-[#0f0d20] text-white" : "bg-[#f7f7fb] text-gray-900"
      }`}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen p-10 ${
        isDark ? "bg-[#0f0d20] text-white" : "bg-[#f7f7fb] text-gray-900"
      }`}>
        Please login first.
      </div>
    );
  }

  const fields = [
    { name: "phone", label: "Phone Number" },
    { name: "location", label: "Location" },
    { name: "profession", label: "Profession" },
    { name: "website", label: "Website" },
  ] as const;

  return (
    <main
      className={`min-h-screen px-4 py-10 transition-colors duration-300 ${
        isDark ? "bg-[#0f0d20]" : "bg-[#f7f7fb]"
      }`}
    >
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              My Profile
            </h1>

            <p className={`mt-2 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              Manage your personal information.
            </p>
          </div>

          {!editing ? (
            <button
              onClick={() => {
                setMessage("");
                setEditing(true);
              }}
              className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={loading}
                className={`rounded-xl border px-4 py-3 transition disabled:opacity-50 ${
                  isDark
                    ? "border-slate-700 bg-[#211e3d] text-gray-200 hover:bg-slate-700"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Message */}

        {message && (
          <p className={`mb-5 rounded-xl p-4 text-sm ${
            message.includes("successfully")
              ? isDark
                ? "bg-green-500/10 text-green-400"
                : "bg-green-50 text-green-700"
              : isDark
                ? "bg-red-500/10 text-red-400"
                : "bg-red-50 text-red-700"
          }`}>
            {message}
          </p>
        )}

        {/* Profile Card */}

        <section className={`rounded-3xl border p-6 shadow-sm transition-colors duration-300 md:p-8 ${
          isDark
            ? "border-slate-800 bg-[#17152f] shadow-black/20"
            : "border-gray-200 bg-white"
        }`}>

          {/* Profile Information */}

          <div className={`mb-7 flex items-center gap-4 border-b pb-7 ${
            isDark ? "border-slate-700" : "border-gray-100"
          }`}>
            {form.image ? (
              <Image
                src={form.image}
                width={80}
                height={80}
                alt="Profile"
                className="h-20 w-20 rounded-2xl object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-100 text-3xl font-bold text-violet-600">
                {form.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h2 className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {user.name}
              </h2>

              <p className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                {user.email}
              </p>

              <span className="mt-2 inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500">
                EventHub Member
              </span>
            </div>
          </div>

          {/* Form Fields */}

          <div className="grid gap-5 md:grid-cols-2">

            {/* Full Name */}

            <div>
              <label className={labelStyle}>Full Name</label>

              {editing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              ) : (
                <p className={displayStyle}>{user.name}</p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className={labelStyle}>Email Address</label>
              <p className={displayStyle}>{user.email}</p>
            </div>

            {/* Profile Image */}

            {editing && (
              <div className="md:col-span-2">
                <label className={labelStyle}>Profile Image URL</label>

                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Enter image URL (optional)"
                  className={inputStyle}
                />
              </div>
            )}

            {/* Other Fields */}

            {fields.map((field) => (
              <div key={field.name}>
                <label className={labelStyle}>
                  {field.label}

                  <span className={`ml-2 text-xs font-normal ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}>
                    (Optional)
                  </span>
                </label>

                {editing ? (
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className={inputStyle}
                  />
                ) : (
                  <p className={displayStyle}>
                    {form[field.name] || "Not added"}
                  </p>
                )}
              </div>
            ))}

            {/* Bio */}

            <div className="md:col-span-2">
              <label className={labelStyle}>
                About Me (Optional)
              </label>

              {editing ? (
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write something about yourself..."
                  className={`${inputStyle} resize-none`}
                />
              ) : (
                <p className={`${displayStyle} leading-7`}>
                  {form.bio || "No bio added yet."}
                </p>
              )}
            </div>

          </div>
        </section>

        {/* Footer */}

        <p className={`mt-6 text-center text-xs ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}>
          Made with care by EventHub ❤️
        </p>

      </div>
    </main>
  );
}
