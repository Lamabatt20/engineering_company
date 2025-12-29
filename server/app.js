import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* ================= PATH SETUP ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 المسار الصحيح: client/public/uploads
const uploadDir = path.join(__dirname, "../client/public/uploads");

// إنشاء المجلد إذا غير موجود
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// static serving
app.use("/uploads", express.static(uploadDir));

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

/* ================= COMPANY INFO ================= */
app.get("/company", async (req, res) => {
  try {
    const company = await prisma.companyInfo.findFirst();
    res.json(company);
  } catch {
    res.status(500).json({ error: "Failed to fetch company info" });
  }
});

/* ================= SERVICES ================= */
app.get("/services", async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

/* ================= PROJECTS ================= */

// GET all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// CREATE project (form-data + images)
app.post("/projects", upload.array("images", 5), async (req, res) => {
  try {
    const { title, shortDesc, description } = req.body;

    if (!title || !shortDesc || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const imagesData = req.files.map((file) => ({
      imageUrl: `/uploads/${file.filename}`, // 👈 يُحفظ هيك بالـ DB
    }));

    const project = await prisma.project.create({
      data: {
        title,
        shortDesc,
        description,
        images: {
          create: imagesData,
        },
      },
      include: { images: true },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
});
// ADD image to existing project
app.post(
  "/projects/:id/images",
  upload.single("image"),
  async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);

      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      // تأكد أن المشروع موجود
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // حفظ الصورة في ProjectImage
      const image = await prisma.projectImage.create({
        data: {
          imageUrl: `/uploads/${req.file.filename}`,
          projectId,
        },
      });

      res.status(201).json({
        message: "Image added successfully",
        image,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  }
);


/* ================= PARTNERS ================= */
app.get("/partners", async (req, res) => {
  try {
    const partners = await prisma.partner.findMany();
    res.json(partners);
  } catch {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
});

/* ================= STATISTICS ================= */
app.get("/statistics", async (req, res) => {
  try {
    const stats = await prisma.statistic.findMany();
    res.json(stats);
  } catch {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

/* ================= WORKFLOW ================= */
app.get("/workflow", async (req, res) => {
  try {
    const steps = await prisma.workflowStep.findMany({
      orderBy: { stepNumber: "asc" },
    });
    res.json(steps);
  } catch {
    res.status(500).json({ error: "Failed to fetch workflow steps" });
  }
});

/* ================= CAREERS ================= */
app.get("/careers", async (req, res) => {
  try {
    const careers = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(careers);
  } catch {
    res.status(500).json({ error: "Failed to fetch careers" });
  }
});

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.send("🚀 Engineering Company API is running");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
