import {
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/eventController.js";
import express from "express";

const router = express.Router();

router.get("/", getEvents); //menampilkan data event
router.post("/", createEvent); // menyimpan data event
router.get("/:id", getEventById); // mengambil data berdasarkan id
router.put("/:id", updateEvent); // mengupdate data event berdasarkan id
router.delete("/:id", deleteEvent); // menghapus data event berdasarkan id

export default router;