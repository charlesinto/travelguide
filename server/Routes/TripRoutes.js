import express from "express";
import conn from "../Database";
import TripController from "../Controller/TripController";
import TripMiddleWare from "../MiddleWare/TripMiddleWare";

const router = express.Router();

router.get('/', TripController.getStartAndEndTerminals);

router.post('/available_trips', TripMiddleWare.validateStartAndArrivalTerminalRequest,
    TripController.getCompanyForTrip);

export default router;