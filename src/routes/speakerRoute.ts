import express from "express";

import {
    getSpeakers,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
} from "../controllers/speakerController";

const router = express.Router();

// menampilkan data speaker
router.get("/", getSpeakers);

// menyimpan data speaker
router.post("/", createSpeaker);

// mengupdate data speaker berdasarkan id
router.put("/:id", updateSpeaker);

// menghapus data speaker berdasarkan id
router.delete("/:id", deleteSpeaker);

export default router;