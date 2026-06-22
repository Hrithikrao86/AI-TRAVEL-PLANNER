"use client";

import { useState,useEffect } from "react";

import api from "../../utils/api";

import CreateTripForm from "../../components/CreateTripForm";

import ItineraryCard from "../../components/ItineraryCard";

import PackingList from "../../components/PackingList";

export default function Dashboard(){
const [trips,setTrips]=useState<any[]>([]);

const [selectedTrip,setSelectedTrip]=useState<any>(null);

const [loading,setLoading]=useState(false);

const handleGenerate=async(data:any)=>{

try{

setLoading(true);

const token=localStorage.getItem("token");

const response=await api.post("/trips/generate",data,{

headers:{

Authorization:

`Bearer ${token}`
}});

setSelectedTrip(response.data);

setTrips((prev:any)=>

prev.some((trip:any)=>trip._id===response.data._id)

? prev

: [response.data,...prev]

);

} 

catch(e){
console.log(e);
}

finally{
setLoading(false);
}}


const fetchTrips=async()=>{

try{

const token=localStorage.getItem("token");

const response=await api.get(

"/trips",

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);

setTrips(response.data);
if(response.data.length>0){

setSelectedTrip(

response.data[0]

);
setTrips((prev:any)=>

prev.map((trip:any)=>

trip._id===response.data._id?response.data:trip));
}}

catch(e){

console.log(e);

}

}


useEffect(()=>{fetchTrips();},[]);

const deleteTrip=async(id:string)=>{

try{

const token=localStorage.getItem("token");

await api.delete(

`/trips/${id}`,

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);

setTrips((prev:any)=>

prev.filter(

(trip:any)=>

trip._id!==id

)

);

if(selectedTrip?._id===id){

setSelectedTrip(null);

}

}

catch(e){

console.log(e);

}

}


return (

<div  className="min-h-screen bg-slate-900 text-white overflow-x-hidden">

  {/* Main Container */}

  <div className="max-w-4xl mx-auto px-6 py-8">

    {/* Header */}

    <div className="mb-12">

      <h1 className="text-5xl font-bold mb-3">

        ✈ AI Travel Planner

      </h1>

      <p className="text-slate-400 text-lg">

        Generate personalized itineraries powered by Gemini AI

      </p>

    </div>

    {/* Create Trip Card */}

    <div className="mb-10">

      <CreateTripForm

        onGenerate={handleGenerate}

      />

    </div>
    <div className="mb-10">

<h2 className="text-3xl font-bold mb-5">

💾 Saved Trips

</h2>

<div className="flex flex-wrap gap-4">

{trips.map((trip:any)=>(

<div
key={trip._id}
className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 flex items-center gap-4 hover:border-blue-500"
>

<button
onClick={()=>setSelectedTrip(trip)}
className="flex-1 text-left"
>

✈ {trip.destination}

</button>

<button
onClick={()=>deleteTrip(trip._id)}
className="text-slate-400 hover:text-red-500 text-base transition"
title="Delete Trip"
>

×

</button>

</div>

))}

</div>

</div>

    {/* Loading */}

    {

      loading &&

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center">

        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>

        <p className="text-xl text-slate-300">

          Generating your dream trip...

        </p>

      </div>

    }

    {/* Trip Result */}

    {

      selectedTrip &&

      <>

        {/* Itinerary */}

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl mb-8">

          <h2 className="text-3xl font-bold mb-6 text-blue-400">

            📅 Itinerary

          </h2>

          <ItineraryCard

            itinerary={selectedTrip.itinerary}

          />

        </div>

        {/* Packing List */}

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">

          

       

<PackingList

packingList={selectedTrip.packingList}

tripId={selectedTrip._id}

setTrip={setSelectedTrip}

/>



        </div>

      </>

    }

  </div>

</div>

)
}