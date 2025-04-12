import { create } from 'zustand';
import { ResumeData } from '@shared/schema';

// Initial resume data
const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  workExperience: [
    {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  education: [
    {
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: {
    technical: '',
    soft: '',
  },
};

// Local storage keys
const STORAGE_KEY = 'resumebuilder_data';
const TEMPLATE_KEY = 'resumebuilder_template';
const COLOR_KEY = 'resumebuilder_color';

interface ResumeStore {
  // State
  template: string;
  colorScheme: string;
  resumeData: ResumeData;
  
  // Actions
  setTemplate: (template: string) => void;
  setColorScheme: (color: string) => void;
  updateResumeData: (data: ResumeData) => void;
  saveResume: () => void;
  loadResume: () => boolean;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  // Default state
  template: localStorage.getItem(TEMPLATE_KEY) || 'professional',
  colorScheme: localStorage.getItem(COLOR_KEY) || 'blue',
  resumeData: JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(initialResumeData)),
  
  // Set the active template
  setTemplate: (template: string) => {
    set({ template });
    localStorage.setItem(TEMPLATE_KEY, template);
  },
  
  // Set the active color scheme
  setColorScheme: (color: string) => {
    set({ colorScheme: color });
    localStorage.setItem(COLOR_KEY, color);
  },
  
  // Update resume data
  updateResumeData: (data: ResumeData) => {
    set({ resumeData: data });
  },
  
  // Save resume to localStorage
  saveResume: () => {
    const { resumeData, template, colorScheme } = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    localStorage.setItem(TEMPLATE_KEY, template);
    localStorage.setItem(COLOR_KEY, colorScheme);
  },
  
  // Load resume from localStorage
  loadResume: () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
    const savedColor = localStorage.getItem(COLOR_KEY);
    
    if (savedData) {
      set({
        resumeData: JSON.parse(savedData),
        template: savedTemplate || 'professional',
        colorScheme: savedColor || 'blue',
      });
      return true;
    }
    
    return false;
  },
  
  // Reset resume to initial state
  resetResume: () => {
    set({
      resumeData: initialResumeData,
      template: 'professional',
      colorScheme: 'blue',
    });
  },
}));
