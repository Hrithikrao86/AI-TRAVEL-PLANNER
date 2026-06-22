"use client";

import { useState } from "react";

export default function CreateTripForm({ onGenerate }: any) {

  const [destination, setDestination] = useState("");

  const [durationDays, setDurationDays] = useState(5);

  const [budgetTier, setBudgetTier] = useState("Medium");

  const [interests, setInterests] = useState("");

  const handleSubmit = () => {

    onGenerate({

      destination,

      durationDays,

      budgetTier,

      interests: interests
        .split(",")
        .map((item) => item.trim())

    });

  };

  return (
<div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl w-full">

  <h2 className="text-4xl font-bold text-white mb-2">
    ✈ Create Your Trip
  </h2>

  <p className="text-slate-400 mb-8">
    Tell us your preferences and let Gemini plan your dream trip.
  </p>

  {/* Destination */}

  <label className="block text-slate-300 font-semibold mb-2">
    Destination
  </label>

  <input
    type="text"
    placeholder="Ex: Japan"
    value={destination}
    onChange={(e)=>setDestination(e.target.value)}
    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-6"
  />

  {/* Duration */}

  <label className="block text-slate-300 font-semibold mb-2">
    Duration (Days)
  </label>

  <input
    type="number"
    value={durationDays}
    onChange={(e)=>setDurationDays(Number(e.target.value))}
    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-6"
  />

  {/* Budget */}

  <label className="block text-slate-300 font-semibold mb-2">
    Budget Tier
  </label>

  <select
    value={budgetTier}
    onChange={(e)=>setBudgetTier(e.target.value)}
    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-6"
  >
    <option value="Low">Low</option>

    <option value="Medium">Medium</option>

    <option value="High">High</option>
  </select>

  {/* Interests */}

  <label className="block text-slate-300 font-semibold mb-2">
    Interests
  </label>

  <input
    type="text"
    placeholder="Anime, Food, Beaches"
    value={interests}
    onChange={(e)=>setInterests(e.target.value)}
    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-8"
  />

  <div className="flex justify-center">

    <button
      onClick={handleSubmit}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
    >
      🚀 Generate Trip
    </button>

  </div>

</div>

  );

}