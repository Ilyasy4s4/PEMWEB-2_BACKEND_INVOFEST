import { Request, Response } from "express";
import { Speaker } from "../types/speaker";

let speakers: Speaker[] = [];

//1. Menampilkan data speaker
export const getSpeakers = (req: Request, res: Response) => {
    res.json(speakers);
};

//2. Menyimpan data speaker
export const createSpeaker = (req: Request, res: Response) => {
    const { nama, role } = req.body;

    // validasi sederhana
    if (!nama || !role) {
        return res.status(400).json({
            message: "Nama dan role wajib diisi",
        });
    }

    const newSpeaker: Speaker = {
        id: Date.now(),
        nama: nama,
        role: role,
    };

    speakers.push(newSpeaker);

    res.status(201).json(newSpeaker);
};

//3. Mengupdate data speaker berdasarkan id
export const updateSpeaker = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const speaker = speakers.find((s) => s.id === id);

    if (!speaker) {
        return res.status(404).json({
            message: "Speaker tidak ditemukan",
        });
    }

    speaker.nama = req.body.nama ?? speaker.nama;
    speaker.role = req.body.role ?? speaker.role;

    res.json(speaker);
};

//4. Menghapus data speaker berdasarkan id
export const deleteSpeaker = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    speakers = speakers.filter((s) => s.id !== id);

    res.json({
        message: "Speaker berhasil dihapus",
    });
};