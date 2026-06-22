import Link from "next/link";

export default function Home() {

  return (

    <div className="min-h-screen bg-slate-900 text-white">

      <div className="max-w-6xl mx-auto px-8 py-20">

        {/* Hero Section */}

        <div className="text-center">

          <h1 className="text-6xl font-bold mb-6">

            ✈ AI Travel Planner

          </h1>

          <p className="text-xl text-slate-300 mb-10">

            Plan AI-powered personalized trips with Gemini

          </p>

          <div className="flex justify-center gap-6">

            <Link href="/login">

              <button

                className="bg-blue-600 hover:bg-blue-700

                px-8 py-3 rounded-xl

                font-semibold transition"

              >

                Login

              </button>

            </Link>

            <Link href="/register">

              <button

                className="border border-slate-500

                hover:bg-slate-800

                px-8 py-3 rounded-xl

                font-semibold transition"

              >

                Register

              </button>

            </Link>

          </div>

        </div>

        {/* Features */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">

          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">

            <div className="text-5xl mb-4">

              🧠

            </div>

            <h2 className="text-2xl font-bold mb-3">

              AI Itineraries

            </h2>

            <p className="text-slate-300">

              Generate personalized travel plans

              powered by Gemini AI.

            </p>

          </div>

          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">

            <div className="text-5xl mb-4">

              🏨

            </div>

            <h2 className="text-2xl font-bold mb-3">

              Hotel Suggestions

            </h2>

            <p className="text-slate-300">

              Get curated hotel recommendations

              matching your budget.

            </p>

          </div>

          <div className="bg-slate-800 p-8 rounded-2xl shadow-lg">

            <div className="text-5xl mb-4">

              🎒

            </div>

            <h2 className="text-2xl font-bold mb-3">

              Packing List

            </h2>

            <p className="text-slate-300">

              Smart packing suggestions

              tailored for your trip.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}