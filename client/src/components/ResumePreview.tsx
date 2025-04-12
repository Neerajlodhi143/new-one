import { useRef } from "react";
import { useResumeStore } from "@/lib/resumeStore";
import { Button } from "@/components/ui/button";
import { ProfessionalTemplate, ModernTemplate, MinimalistTemplate } from "@/components/ui/resume-template";
import { useToast } from "@/hooks/use-toast";
import { Printer, FileDown, Save, FolderOpen } from "lucide-react";
import html2pdf from "html2pdf.js";

export default function ResumePreview() {
  const { template, colorScheme, resumeData, saveResume, loadResume } = useResumeStore();
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);

  // Get color class based on selected color scheme
  const getColorClass = () => {
    return colorScheme || "blue";
  };

  // Print the resume
  const handlePrint = () => {
    window.print();
  };

  // Export resume as PDF
  const handleExportPDF = () => {
    if (!resumeRef.current) return;
    
    // Check if user has entered a name
    if (!resumeData.personalInfo.fullName) {
      toast({
        title: "Missing information",
        description: "Please enter at least your name before exporting",
        variant: "destructive",
      });
      return;
    }

    const options = {
      filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    
    toast({
      title: "Preparing PDF",
      description: "Your resume is being generated...",
    });

    html2pdf()
      .from(resumeRef.current)
      .set(options)
      .save()
      .then(() => {
        toast({
          title: "Success!",
          description: "Your resume has been exported as a PDF",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to export resume. Please try again.",
          variant: "destructive",
        });
        console.error("PDF export error:", error);
      });
  };

  // Save resume to localStorage
  const handleSave = () => {
    saveResume();
    toast({
      title: "Resume saved",
      description: "Your resume has been saved to local storage",
    });
  };

  // Load resume from localStorage
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

  return (
    <div className="lg:w-1/2 print-container">
      <div className="sticky top-24">
        <div className="flex justify-between items-center mb-4 no-print">
          <h2 className="text-xl font-semibold font-sans text-foreground">Preview</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="px-3 py-2 text-sm"
            >
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoad}
              className="px-3 py-2 text-sm"
            >
              <FolderOpen className="mr-2 h-4 w-4" /> Load
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="px-3 py-2 text-sm"
            >
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportPDF}
              className="px-3 py-2 text-sm bg-primary text-primary-foreground"
            >
              <FileDown className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>
        
        <div
          id="resume-preview"
          className="resume-preview bg-white shadow-lg rounded-lg overflow-hidden border border-border max-w-3xl mx-auto print:shadow-none print:border-0"
          style={{ minHeight: "29.7cm" }}
        >
          {template === "professional" && (
            <ProfessionalTemplate
              ref={resumeRef}
              data={resumeData}
              colorClass={getColorClass()}
              className="template-content"
            />
          )}
          
          {template === "modern" && (
            <ModernTemplate
              ref={resumeRef}
              data={resumeData}
              colorClass={getColorClass()}
              className="template-content"
            />
          )}
          
          {template === "minimalist" && (
            <MinimalistTemplate
              ref={resumeRef}
              data={resumeData}
              colorClass={getColorClass()}
              className="template-content"
            />
          )}
        </div>
      </div>
    </div>
  );
}
