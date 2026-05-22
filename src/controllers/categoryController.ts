import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua category
export const getCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const allCategories = await prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(allCategories);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data category",
      error,
    });
  }
};

// 2. Menambahkan category
export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Field name wajib diisi",
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: "Category berhasil ditambahkan",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan category",
      error,
    });
  }
};

// 3. Mengambil category berdasarkan id
export const getCategoryById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil category",
      error,
    });
  }
};

// 4. Update category
export const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const { name } = req.body;

    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate category",
      error,
    });
  }
};

// 5. Hapus category
export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await prisma.category.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Category berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus category",
      error,
    });
  }
};