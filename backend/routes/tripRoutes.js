const express=require("express");
const authentication=require("../middleware/auth");
const {createTrip, getTrips, generateTrip, getTripById, deleteTrip,addActivity,removeActivity,regenerateDay,togglePackingItem} = require("../controllers/tripController");
const router=express.Router();

router.get("/test",authentication,(req,res)=>{

res.json({message:"Protected Route",user:req.user})
})
router.post("/generate",authentication,generateTrip);

router.post("/", authentication, createTrip);

router.get("/", authentication, getTrips);

router.get("/:id", authentication, getTripById);

router.delete("/:id", authentication, deleteTrip);

router.post("/:tripId/day/:dayNumber/activity",authentication,addActivity);

router.delete("/:tripId/day/:dayNumber/activity/:activityIndex",authentication,removeActivity);

router.post("/:tripId/day/:dayNumber/regenerate",authentication,regenerateDay);

router.patch("/:tripId/packing/:itemId",authentication,togglePackingItem);


module.exports=router;