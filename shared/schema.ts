import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Resume table
export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  template: text("template").notNull(),
  colorScheme: text("color_scheme").notNull(),
  data: jsonb("data").notNull(),
});

export const insertResumeSchema = createInsertSchema(resumes).pick({
  userId: true,
  title: true,
  template: true,
  colorScheme: true,
  data: true,
});

// Template data schema
export const resumeDataSchema = z.object({
  personalInfo: z.object({
    fullName: z.string(),
    jobTitle: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    summary: z.string().optional(),
  }),
  workExperience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      current: z.boolean().optional(),
      description: z.string().optional(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ),
  skills: z.object({
    technical: z.string().optional(),
    soft: z.string().optional(),
  }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;

export type ResumeData = z.infer<typeof resumeDataSchema>;
