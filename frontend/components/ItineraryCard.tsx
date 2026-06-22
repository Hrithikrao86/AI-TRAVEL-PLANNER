export default function ItineraryCard({ itinerary }: any) {
  return (
    <div>
      {itinerary.map((day: any, index: number) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-6 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
              {day.day}
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                Day {day.day}
              </h3>

              <p className="text-blue-400 font-medium">
                {day.theme}
              </p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-slate-300 mb-3">
            Activities
          </h4>

          <ul className="space-y-3">
            {day.activities?.map((activity: string, i: number) => (
              <li
                key={i}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-blue-500 transition"
              >
                ✈ {activity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}