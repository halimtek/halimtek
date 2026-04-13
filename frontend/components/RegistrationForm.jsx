"use client";

import React, { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    projectVision: "",
    tracks: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const availableTracks = ["Web Development", "Mobile App", "AI/ML", "Backend"];

  const handleTrackToggle = (track) => {
    setFormData((prev) => ({
      ...prev,
      tracks: prev.tracks.includes(track)
        ? prev.tracks.filter((t) => t !== track)
        : [...prev.tracks, track],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // This pulls your backend link from Vercel/Local Environment Variables
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Success! Check your email.");
      } else {
        setMessage(`❌ Error: ${data.detail || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setMessage("❌ Connection to Halim Tek Core failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1>Registration</h1>
        
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        <div className="tracks-selection">
          <p>Select Tracks:</p>
          <div className="flex gap-2 flex-wrap">
            {availableTracks.map((track) => (
              <button
                key={track}
                type="button"
                onClick={() => handleTrackToggle(track)}
                className={`px-3 py-1 rounded ${
                  formData.tracks.includes(track) 
                  ? "bg-teal-500 text-black" 
                  : "bg-gray-700 text-white"
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Project Vision"
          value={formData.projectVision}
          onChange={(e) => setFormData({ ...formData, projectVision: e.target.value })}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-teal-500 text-black font-bold rounded hover:bg-teal-400 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Submit Application"}
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}