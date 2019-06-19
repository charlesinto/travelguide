import express from "express";
import conn from "../Database";
import TripController from "../Controller/TripController";
import TripMiddleWare from "../MiddleWare/TripMiddleWare";

const router = express.Router();

router.post('/', TripMiddleWare.validateTripBeforePost, TripController.bookTrip);

export default router;