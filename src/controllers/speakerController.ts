import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua speaker
export const getSpeakers = async (req: Request, res: Response) => {
  try {
    const allSpeakers = await prisma.speaker.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(allSpeakers);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data speaker",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// 2. Mengambil speaker berdasarkan id
export const getSpeakerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const speaker = await prisma.speaker.findUnique({
      where: {
        id,
      },
    });

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker tidak ditemukan",
      });
    }

    res.json(speaker);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil speaker",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// 3. Menambahkan speaker (Sudah Dioptimalkan)
export const createSpeaker = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body;

    // Validasi kecukupan data request
    if (!name || !role) {
      return res.status(400).json({
        message: "Nama dan Role wajib diisi",
      });
    }

    const newSpeaker = await prisma.speaker.create({
      data: {
        name: name.trim(),
        role: role.trim(),
      },
    });

    return res.status(201).json({
      message: "Speaker berhasil ditambahkan",
      speaker: newSpeaker,
    });
  } catch (error) {
    console.error("Error creating speaker:", error);
    return res.status(500).json({
      message: "Gagal menambahkan speaker di database",
      error: error instanceof Error ? error.message : error, // Mengirimkan pesan teks error asli dari Supabase/Prisma
    });
  }
};

// 4. Update speaker
export const updateSpeaker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, role } = req.body;

    const updatedSpeaker = await prisma.speaker.update({
      where: {
        id,
      },
      data: {
        name: name?.trim(),
        role: role?.trim(),
      },
    });

    res.json(updatedSpeaker);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate speaker",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// 5. Hapus speaker
export const deleteSpeaker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.speaker.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Speaker berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus speaker",
      error: error instanceof Error ? error.message : error,
    });
  }
};