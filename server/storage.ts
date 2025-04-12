import { resumes, type Resume, type InsertResume, type ResumeData } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  saveResumeAnalytics(resume: InsertResume): Promise<Resume>;
  getAllResumes(): Promise<Resume[]>;
  getTemplateUsage(): Promise<Record<string, number>>;
  getColorUsage(): Promise<Record<string, number>>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private resumes: Map<number, Resume>;
  private currentId: number;

  constructor() {
    this.resumes = new Map();
    this.currentId = 1;
  }

  async saveResumeAnalytics(insertResume: InsertResume): Promise<Resume> {
    const id = this.currentId++;
    const resume: Resume = { ...insertResume, id };
    this.resumes.set(id, resume);
    return resume;
  }

  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }

  async getTemplateUsage(): Promise<Record<string, number>> {
    const templateCount: Record<string, number> = {};
    
    for (const resume of this.resumes.values()) {
      if (!templateCount[resume.template]) {
        templateCount[resume.template] = 0;
      }
      templateCount[resume.template]++;
    }
    
    return templateCount;
  }

  async getColorUsage(): Promise<Record<string, number>> {
    const colorCount: Record<string, number> = {};
    
    for (const resume of this.resumes.values()) {
      if (!colorCount[resume.colorScheme]) {
        colorCount[resume.colorScheme] = 0;
      }
      colorCount[resume.colorScheme]++;
    }
    
    return colorCount;
  }
}

export const storage = new MemStorage();
