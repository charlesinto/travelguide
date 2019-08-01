import express from "express";
import TripMiddleWare from "../MiddleWare/TripMiddleWare";
import TripBookController from "../Controller/TripBookController";

const router = express.Router();

router.post('/',TripMiddleWare.validateTripDetails, TripBookController.registerNewTrip);

export default router;