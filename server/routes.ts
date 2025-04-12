import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { resumeDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all resumes for analytics
  app.get("/api/analytics/resumes", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      res.json({ resumes });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume analytics" });
    }
  });

  // Get template usage stats
  app.get("/api/analytics/templates", async (req, res) => {
    try {
      const templates = await storage.getTemplateUsage();
      res.json({ templates });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template analytics" });
    }
  });

  // Get color scheme usage stats
  app.get("/api/analytics/colors", async (req, res) => {
    try {
      const colors = await storage.getColorUsage();
      res.json({ colors });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch color analytics" });
    }
  });

  // Save resume for analytics
  app.post("/api/analytics/save", async (req, res) => {
    try {
      const schema = z.object({
        template: z.string(),
        colorScheme: z.string(),
        data: resumeDataSchema,
      });
      
      const validatedData = schema.parse(req.body);
      
      const resume = await storage.saveResumeAnalytics({
        userId: 1, // Anonymous user
        title: validatedData.data.personalInfo.jobTitle || "Untitled Resume",
        template: validatedData.template,
        colorScheme: validatedData.colorScheme,
        data: validatedData.data,
      });
      
      res.json({ success: true, resumeId: resume.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid resume data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save resume analytics" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
