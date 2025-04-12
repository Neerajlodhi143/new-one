import { FileDown, Save, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/resumeStore";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

export default function Header() {
  const { resumeData, saveResume, loadResume } = useResumeStore();
  const { toast } = useToast();

  // Handle save button click
  const handleSave = () => {
    saveResume();
    toast({
      title: "Resume saved",
      description: "Your resume has been saved to local storage",
    });
  };

  // Handle load button click
  const handleLoad = () => {
    const loaded = loadResume();
    if (loaded) {
      toast({
        title: "Resume loaded",
        description: "Your saved resume has been loaded",
      });
    } else {
      toast({
        title: "No saved resume",
        description: "No previously saved resume was found",
        variant: "destructive",
      });
    }
  };

  // Handle export PDF button click
  const handleExportPDF = () => {
    // We'll use window print as a fallback since the main PDF export is in ResumePreview
    window.print();
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-10 no-print">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <svg className="h-8 w-8 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-2xl font-semibold font-sans text-foreground">ResumeBuilder</h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleSave}
            className="px-4 py-2 text-sm"
          >
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button
            variant="outline"
            onClick={handleLoad}
            className="px-4 py-2 text-sm"
          >
            <FolderOpen className="mr-2 h-4 w-4" /> Load
          </Button>
          <Button
            variant="default"
            onClick={handleExportPDF}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground"
          >
            <FileDown className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>
    </header>
  );
}
