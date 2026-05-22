import express from "express";

import {
  getSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} from "../controllers/speakerController.js";

const router = express.Router();

// menampilkan semua speaker
router.get("/", getSpeakers);

// mengambil speaker berdasarkan id
router.get("/:id", getSpeakerById);

// menyimpan data speaker
router.post("/", createSpeaker);

// mengupdate data speaker berdasarkan id
router.put("/:id", updateSpeaker);

// menghapus data speaker berdasarkan id
router.delete("/:id", deleteSpeaker);


export default router;