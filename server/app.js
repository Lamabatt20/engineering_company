import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* ================= COMPANY INFO ================= */
app.get("/company", async (req, res) => {
  try {
    const company = await prisma.companyInfo.findFirst();
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch company info" });
  }
});

/* ================= SERVICES ================= */
app.get("/services", async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

/* ================= PROJECTS ================= */
app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: true,
        service: true,
      },
      orderBy: { year: "desc" },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.get("/projects/service/:id", async (req, res) => {
  const serviceId = parseInt(req.params.id);

  try {
    const projects = await prisma.project.findMany({
      where: { serviceId },
      include: { images: true },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects by service" });
  }
});

/* ================= PARTNERS ================= */
app.get("/partners", async (req, res) => {
  try {
    const partners = await prisma.partner.findMany();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
});

/* ================= STATISTICS ================= */
app.get("/statistics", async (req, res) => {
  try {
    const stats = await prisma.statistic.findMany();
    res.json(stats);
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch careers" });
  }
});

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("🚀 Engineering Company API is running");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
