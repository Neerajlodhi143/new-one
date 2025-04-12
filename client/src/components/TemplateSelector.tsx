import { useState, useEffect } from "react";
import { useResumeStore } from "@/lib/resumeStore";
import { templates } from "@/lib/templates";

export default function TemplateSelector() {
  const { template, setTemplate } = useResumeStore();
  
  // Images for template previews
  const templateImages = {
    professional: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    modern: "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    minimalist: "https://images.unsplash.com/photo-1586282023338-52aa4c99d7ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  };

  const handleTemplateSelect = (templateId: string) => {
    setTemplate(templateId);
  };

  return (
    <section className="mb-12 no-print">
      <h2 className="text-2xl font-semibold font-sans mb-6 text-foreground">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((templateOption) => (
          <div
            key={templateOption.id}
            className={`template-card cursor-pointer bg-card rounded-lg shadow-md overflow-hidden border-2 ${
              template === templateOption.id ? 'border-primary' : 'border-transparent hover:border-primary'
            } transition-all duration-200`}
            data-template={templateOption.id}
            onClick={() => handleTemplateSelect(templateOption.id)}
          >
            <div className="h-48 bg-gray-200 relative">
              <img
                src={templateImages[templateOption.id as keyof typeof templateImages]}
                alt={`${templateOption.name} template preview`}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 bg-${templateOption.color} text-white px-2 py-1 rounded text-xs`}>
                {templateOption.name}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{templateOption.name}</h3>
              <p className="text-sm text-muted-foreground">{templateOption.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
