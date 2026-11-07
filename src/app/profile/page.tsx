
"use client";

import { useEffect, useState } from "react";
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

      if (error) {
        throw new Error(error.message);
      }

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

  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500";

  if (session.isPending) {
    return <div className="p-10">Loading...</div>;
  }

  if (!user) {
    return <div className="p-10">Please login first.</div>;
  }

  const fields = [
    { name: "phone", label: "Phone Number" },
    { name: "location", label: "Location" },
    { name: "profession", label: "Profession" },
    { name: "website", label: "Website" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#f7f7fb] px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your personal information.
            </p>
          </div>

          {!editing ? (
            <button
              onClick={() => {
                setMessage("");
                setEditing(true);
              }}
              className="rounded-xl bg-violet-600 px-5 py-3 text-white"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="rounded-xl border bg-white px-4 py-3"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-xl bg-violet-600 px-5 py-3 text-white disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {message && (
          <p className="mb-5 rounded-xl bg-violet-50 p-4 text-sm text-violet-700">
            {message}
          </p>
        )}

        <section className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">

          <div className="mb-7 flex items-center gap-4">
            {form.image ? (
              <Image
                src={form.image}
                width={45}
                height={40}
                alt="Profile"
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-100 text-3xl font-bold text-violet-600">
                {form.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              {editing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />
              ) : (
                <p className="rounded-xl bg-gray-50 p-3">
                  {user.name}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <p className="rounded-xl bg-gray-50 p-3">
                {user.email}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className={`mb-2 block text-sm font-semibold ${editing? "block" : "hidden"}`}>
                Profile Image URL
              </label>

              {editing ? (
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Enter image URL (optional)"
                  className={inputStyle}
                />
              ) : (
                <p className="rounded-xl bg-gray-50 p-3 break-all hidden">
                  {form.image || "No image added"}
                </p>
              )}
            </div>

            {fields.map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-semibold">
                  {field.label}
                  <span className="ml-2 text-xs font-normal text-gray-400">
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
                  <p className="rounded-xl bg-gray-50 p-3">
                    {form[field.name] || "Not added"}
                  </p>
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                About Me (Optional)
              </label>

              {editing ? (
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write something about yourself..."
                  className={inputStyle + " resize-none"}
                />
              ) : (
                <p className="rounded-xl bg-gray-50 p-4 leading-7">
                  {form.bio || "No bio added yet."}
                </p>
              )}
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
