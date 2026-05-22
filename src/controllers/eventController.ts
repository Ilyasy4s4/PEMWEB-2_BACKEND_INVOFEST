import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua event
export const getEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const allEvents = await prisma.event.findMany({
      include: {
        category: true,
        speaker: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(allEvents);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data event",
      error,
    });
  }
};

// 2. Menambahkan event
export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      location,
      dateEvent,
      description,
      categoryId,
      speakerId,
    } = req.body;

    if (
      !name ||
      !location ||
      !dateEvent ||
      !description ||
      !categoryId ||
      !speakerId
    ) {
      return res.status(400).json({
        message: "Semua field harus diisi",
      });
    }

    const newEvent = await prisma.event.create({
      data: {
        name,
        location,
        dateEvent: new Date(dateEvent),
        description,
        categoryId: Number(categoryId),
        speakerId: Number(speakerId),
      },
    });

    res.status(201).json({
      message: "Event berhasil ditambahkan",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan event",
      error,
    });
  }
};

// 3. Mengambil event berdasarkan id
export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        speaker: true,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil event",
      error,
    });
  }
};

// 4. Update event
export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      location,
      dateEvent,
      description,
      categoryId,
      speakerId,
    } = req.body;

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        name,
        location,
        dateEvent: new Date(dateEvent),
        description,
        categoryId: Number(categoryId),
        speakerId: Number(speakerId),
      },
    });

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate event",
      error,
    });
  }
};

// 5. Hapus event
export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await prisma.event.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Event berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus event",
      error,
    });
  }
};