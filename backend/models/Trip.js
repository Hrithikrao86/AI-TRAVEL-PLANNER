const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    destination:{
        type:String,
        required:true
    },

    durationDays:{
        type:Number,
        required:true
    },

    budgetTier:{
        type:String,
        required:true
    },

    interests:{
        type:[String],
        default:[]
    },

    itinerary:{
        type:Array,
        default:[]
    },

    hotels:{
        type:Array,
        default:[]
    },

   estimatedBudget:{
    transport:{
        type:Number,
        default:0
    },

    accommodation:{
        type:Number,
        default:0
    },

    food:{
        type:Number,
        default:0
    },

    activities:{
        type:Number,
        default:0
    },

    total:{
        type:Number,
        default:0
    }
},

    packingList:[

{

item:{

type:String,

required:true

},

category:{

type:String,

enum:[

"Documents",

"Clothing",

"Gear",

"Other"

],

default:"Other"

},

isPacked:{type:Boolean,default:false}

}

]

},
{
    timestamps:true
});

module.exports=mongoose.model("Trip",TripSchema);