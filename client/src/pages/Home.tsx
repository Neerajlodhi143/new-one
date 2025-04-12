import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TemplateSelector from "@/components/TemplateSelector";
import ColorSchemeSelector from "@/components/ColorSchemeSelector";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { useResumeStore } from "@/lib/resumeStore";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { template, colorScheme, resumeData } = useResumeStore();
  const { toast } = useToast();

  // Save analytics on resume changes
  const saveAnalyticsMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/analytics/save", {
        template,
        colorScheme,
        data: resumeData,
      });
    },
  });

  // Save anonymous analytics when major changes occur
  useEffect(() => {
    const saveAnalyticsDebounced = setTimeout(() => {
      // Only save if there's a name entered (indicates user has started working)
      if (resumeData.personalInfo.fullName) {
        saveAnalyticsMutation.mutate();
      }
    }, 5000);

    return () => clearTimeout(saveAnalyticsDebounced);
  }, [template, colorScheme, resumeData.personalInfo.fullName]);

  return (
    <div className="bg-background font-sans text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <TemplateSelector />
        <ColorSchemeSelector />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <ResumeForm />
          <ResumePreview />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
