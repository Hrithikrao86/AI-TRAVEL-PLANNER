"use client";

import {useState} from "react";

import api from "../utils/api";


export default function ItineraryCard({

itinerary,

tripId,

setTrip

}:any) {
  const [feedbacks,setFeedbacks]=useState<any>({});

const [loadingDay,setLoadingDay]=useState<number|null>(null);

const regenerateDay=async(day:number)=>{

try{

setLoadingDay(day);

const token=localStorage.getItem("token");

const response=await api.post(`/trips/${tripId}/day/${day}/regenerate`,

{

instruction:

feedbacks[day]

},

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);

setTrip(response.data);

setFeedbacks({

...feedbacks,

[day]:""

});

}

catch(e){

console.log(e);

}

finally{

setLoadingDay(null);

}

}

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
               <div className="flex gap-3 mt-4">

<input

type="text"

placeholder="Ex: Make this day hiking instead of shopping"

value={feedbacks[day.day]||""}

onChange={(e)=>

setFeedbacks({

...feedbacks,

[day.day]:

e.target.value

})

}



className="flex-1 p-3 rounded-lg bg-slate-700 border border-slate-600"

/>

<button

onClick={()=>

regenerateDay(day.day)

}

className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"

>

{

loadingDay===day.day

?

"Regenerating..."

:

"🔄 Regenerate"

}

</button>

</div>

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