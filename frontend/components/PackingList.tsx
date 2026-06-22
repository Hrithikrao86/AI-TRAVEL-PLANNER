"use client";

import api from "../utils/api";

export default function PackingList({packingList,tripId,setTrip}:any){

const toggleItem=async(itemId:string)=>{

try{

const response=await api.patch(`/trips/${tripId}/packing/${itemId}`);

setTrip(response.data);

}

catch(e){

console.log(e);

}

}

return(

<div>

<h2 className="text-3xl font-bold text-green-400 mb-6">🎒 Packing List</h2>

<div className="grid md:grid-cols-2 gap-4">

{packingList.map((item:any,index:number)=>(

<div key={index} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-green-500 transition">

<div className="flex items-center gap-3">

<input
type="checkbox"
checked={item.isPacked}
onChange={()=>toggleItem(item._id)}
className="h-5 w-5 accent-green-500"
/>

<div>

<p className={`${item.isPacked?"line-through text-slate-500":"text-white"} text-lg`}>

{item.item}

</p>

<span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">

{item.category}

</span>

</div>

</div>

</div>

))}

</div>

</div>

)

}