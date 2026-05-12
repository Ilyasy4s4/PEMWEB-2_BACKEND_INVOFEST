import { Request, Response } from "express";
import { Event} from "../types/event";

let Events: Event[] = [];

//1. Menampilkan data event
export const getEvents = (req: Request, res: Response) => {
    res.json(Events);
};

//2. Menyimpan data event
export const createEvent = (req: Request, res: Response) => {
    const { name, category, tanggal, description } = req.body;

    // validasi jika semua field belum diisi
    if (!name || !category || !tanggal || !description) {
        return res.status(500).json({ message: "Semua field event harus diisi" });
    }

    const newEvent: Event = {
        id: Date.now(), // generate id unik berdasarkan timestamp
        name: name,
        category: category,
        tanggal: tanggal, // konversi string ke Date
        description: description,
    };

    Events.push(newEvent);
    res.status(201).json({ message: "Event berhasil ditambahkan", event: newEvent });
};

//3.Mengambil data berdasarkan id
export const getEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    
    const event = Events.find((e) => e.id === id);

    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    res.json(event);
};

//4. Mengupdate data event berdasarkan id
export const updateEvent = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const event = Events.find((e) => e.id === id);

    if (!event) {
        return res.status(404).json({
            message: "Event tidak ditemukan",
        });
    }

    event.name = req.body.name ?? event.name;
    event.category = req.body.category ?? event.category;
    event.tanggal = req.body.tanggal ?? event.tanggal;
    event.description = req.body.description ?? event.description;

    res.json(event);
};


//5. Menghapus data event berdasarkan id
export const deleteEvent = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    Events = Events.filter((e) => e.id !== id);

    res.json({
        message: "Event berhasil dihapus",
    });
};