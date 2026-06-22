const Trip = require("../models/Trip");
const model = require("../config/gemini");

const generateTrip = async(req,res)=>{

    try{
        const {destination,durationDays,budgetTier,interests} = req.body;
const prompt = `
Generate a travel itinerary.

Destination: ${destination}

Duration: ${durationDays} days

Budget: ${budgetTier}

Interests: ${interests.join(", ")}

IMPORTANT:

Return ONLY pure JSON.

Do NOT use markdown.

Do NOT use code blocks.

Format:

{

"itinerary":[

{

"day":1,

"theme":"",

"activities":[],

"meals":{

"breakfast":"",

"lunch":"",

"dinner":""

}

}

],

"hotels":[],

"estimatedBudget":{

"transport":0,

"accommodation":0,

"food":0,

"activities":0,

"total":0

},

"packingList":[

{

"item":"Passport",

"category":"Documents",

"isPacked":false

},

{

"item":"Winter Jacket",

"category":"Clothing",

"isPacked":false

},

{

"item":"Hiking Boots",

"category":"Gear",

"isPacked":false

}

]

}

Packing list should include:

- Documents

- Clothing

- Gear

- Other

Generate multiple packing items.

Choose category appropriately.

Set isPacked=false initially.
`;

const result=await model.generateContent(prompt);

const response=result.response.text();
const cleanedResponse = response
    .replace(/```json/g,"")
    .replace(/```/g,"")
    .trim();

const tripData = JSON.parse(cleanedResponse);

const trip = new Trip({
userId:req.user,
destination,
durationDays,
budgetTier,
interests,
itinerary:tripData.itinerary,
hotels:tripData.hotels,
estimatedBudget:tripData.estimatedBudget,
packingList:tripData.packingList
});

await trip.save();

return res.status(201).json(trip);


}
   catch (e) {

        console.log(e);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

}


const addActivity = async (req,res)=>{

try{

const {tripId,dayNumber}=req.params;

const {activity}=req.body;

const trip=await Trip.findOne({

_id:tripId,

userId:req.user

});

if(!trip){

return res.status(404).json({

message:"Trip not found"

});

}

const day=trip.itinerary.find(

(item)=>item.day==dayNumber

);

if(!day){

return res.status(404).json({

message:"Day not found"

});

}

day.activities.push(activity);

await trip.save();

return res.json(trip);

}

catch(e){

console.log(e);

return res.status(500).json({

message:"Internal Server Error"

});

}

}

const togglePackingItem=async(req,res)=>{

try{

const {tripId,itemId}=req.params;

const trip=await Trip.findOne({

_id:tripId,

userId:req.user

});

if(!trip){

return res.status(404).json({

message:"Trip not found"

});

}

const item=

trip.packingList.id(itemId);

if(!item){

return res.status(404).json({

message:"Packing item not found"

});

}

item.isPacked=

!item.isPacked;

await trip.save();

return res.json(trip);

}

catch(e){

console.log(e);

return res.status(500).json({

message:"Internal Server Error"

});

}

}

const createTrip=async (req,res)=>{
    try{
        const {destination,durationDays,budgetTier,interests} = req.body;
    const trip = new Trip({
        userId:req.user,
        destination,
        durationDays,
        budgetTier,
        interests
    });

    await trip.save();
    return res.status(201).json(trip);
}
     catch (e) {

        console.log(e);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }
}

const getTrips=async (req,res)=>{
try{
 const tripdetail=await Trip.find({userId:req.user});
 return res.json(tripdetail)
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
        message: "Internal Server Error"
        });

    }
}

const getTripById=async (req,res)=>{

    try{
        const trip=await Trip.findOne({_id:req.params.id,userId:req.user})
        if(!trip){

    return res.status(404).json({

        message:"Trip not found"

    });

}
        return res.json(trip)
    }
     catch (e) {
        console.log(e);
        return res.status(500).json({
        message: "Internal Server Error"
        });

    }
}

const removeActivity=async(req,res)=>{

try{

const {tripId,dayNumber,activityIndex}

=req.params;

const trip=await Trip.findOne({

_id:tripId,

userId:req.user

});

if(!trip){

return res.status(404).json({

message:"Trip not found"

});

}

const day=trip.itinerary.find(

item=>item.day==dayNumber

);

if(!day){

return res.status(404).json({

message:"Day not found"

});

}

day.activities.splice(activityIndex,1);

await trip.save();

return res.json(trip);

}

catch(e){

console.log(e);

return res.status(500).json({

message:"Internal Server Error"

});

}

}

const regenerateDay = async (req,res)=>{

try{

const {tripId,dayNumber}=req.params;

const {instruction}=req.body;

const trip=await Trip.findOne({_id:tripId,userId:req.user});

if(!trip){

return res.status(404).json({

message:"Trip not found"

});

}

const currentDay=trip.itinerary.find(item=>item.day==dayNumber);

if(!currentDay){

return res.status(404).json({

message:"Day not found"

});

}

const prompt=`

You are an expert travel planner.

Destination: ${trip.destination}

Budget: ${trip.budgetTier}

Duration: ${trip.durationDays}

Interests:

${trip.interests.join(", ")}

Current Day ${day}:

${JSON.stringify(trip.itinerary[day-1])}

User wants:

"${feedback}"

IMPORTANT:

Generate a COMPLETELY NEW itinerary for ONLY Day ${day}.

It MUST be different from the current itinerary.

Return ONLY JSON:

{

"day":${day},

"theme":"",

"activities":[],

"meals":{

"breakfast":"",

"lunch":"",

"dinner":""

}

}

`;

const result=await model.generateContent(prompt);

const response= result.response.text();

const cleanedResponse=response

.replace(/```json/g,"")

.replace(/```/g,"")

.trim();

const generatedDay=

JSON.parse(cleanedResponse);

const dayIndex=

trip.itinerary.findIndex(

item=>item.day==dayNumber

);

trip.itinerary[dayIndex]

=

generatedDay;

await trip.save();

return res.json(trip);

}

catch(e){

console.log(e);

return res.status(500).json({

message:"Internal Server Error"

});

}

}


const deleteTrip=async (req,res)=>{
   try{
 const deletedTrip =await Trip.findOneAndDelete({
        _id:req.params.id,
        userId:req.user
});
   if(!deletedTrip){
        return res.status(404).json({
        message:"Trip not found"
});
}
return res.status(200).json({
    message:"Trip deleted successfully"
});
   }
   catch(e){
        console.log(e);
        return res.status(500).json({
        message: "Internal Server Error"
        });
   }

}



module.exports={createTrip,getTrips,getTripById,deleteTrip,generateTrip,addActivity,removeActivity,regenerateDay,togglePackingItem};