import { forwardRef, RefObject } from "react";
import { cn } from "@/lib/utils";
import { ResumeData } from "@shared/schema";

// Professional Template
export const ProfessionalTemplate = forwardRef<
  HTMLDivElement,
  {
    data: ResumeData;
    colorClass: string;
    className?: string;
  }
>(({ data, colorClass, className }, ref) => {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
  } = data;

  const headerBgClass = `bg-${colorClass}-600`;
  const headerTextClass = "text-white";
  const titleClass = `text-${colorClass}-600`;
  const borderClass = `border-${colorClass}-200`;

  const technicalSkills = skills.technical
    ? skills.technical.split(",").map((skill) => skill.trim())
    : [];
  
  const softSkills = skills.soft
    ? skills.soft.split(",").map((skill) => skill.trim())
    : [];

  return (
    <div ref={ref} className={cn("bg-white w-full", className)}>
      <div className={cn("p-8", headerBgClass, headerTextClass)}>
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Full Name"}</h1>
        <p className="text-xl">{personalInfo.jobTitle || "Job Title"}</p>
        
        <div className="flex flex-wrap mt-3 gap-4">
          {personalInfo.email && (
            <div className="flex items-center text-sm">
              <i className="fas fa-envelope mr-2"></i>
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-sm">
              <i className="fas fa-phone mr-2"></i>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center text-sm">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center text-sm">
              <i className="fas fa-globe mr-2"></i>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className={cn("text-xl font-bold border-b pb-2 mb-3", titleClass, borderClass)}>
              Professional Summary
            </h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}
        
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className={cn("text-xl font-bold border-b pb-2 mb-3", titleClass, borderClass)}>
              Work Experience
            </h2>
            
            {workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <h4 className="text-gray-700">{exp.company}</h4>
                </div>
                {exp.description && <p className="text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className={cn("text-xl font-bold border-b pb-2 mb-3", titleClass, borderClass)}>
              Education
            </h2>
            
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-gray-600">
                      {edu.startDate || ""} {edu.startDate && edu.endDate && "-"} {edu.endDate || ""}
                    </span>
                  )}
                </div>
                <h4 className="text-gray-700 mb-1">{edu.institution}</h4>
                {edu.description && <p className="text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {(technicalSkills.length > 0 || softSkills.length > 0) && (
          <div>
            <h2 className={cn("text-xl font-bold border-b pb-2 mb-3", titleClass, borderClass)}>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technicalSkills.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Technical Skills</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {technicalSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {softSkills.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Soft Skills</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {softSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
ProfessionalTemplate.displayName = "ProfessionalTemplate";

// Modern Template
export const ModernTemplate = forwardRef<
  HTMLDivElement,
  {
    data: ResumeData;
    colorClass: string;
    className?: string;
  }
>(({ data, colorClass, className }, ref) => {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
  } = data;

  const accentClass = `bg-${colorClass}-600`;
  const textAccentClass = `text-${colorClass}-600`;

  const technicalSkills = skills.technical
    ? skills.technical.split(",").map((skill) => skill.trim())
    : [];
  
  const softSkills = skills.soft
    ? skills.soft.split(",").map((skill) => skill.trim())
    : [];

  return (
    <div ref={ref} className={cn("bg-white w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={cn("p-8 text-white", accentClass, "md:col-span-1")}>
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Full Name"}</h1>
            <p className="text-xl mb-4">{personalInfo.jobTitle || "Job Title"}</p>
            
            <div className="space-y-2">
              {personalInfo.email && (
                <div className="flex items-center">
                  <i className="fas fa-envelope mr-2 w-5"></i>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center">
                  <i className="fas fa-phone mr-2 w-5"></i>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.location && (
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 w-5"></i>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              
              {personalInfo.website && (
                <div className="flex items-center">
                  <i className="fas fa-globe mr-2 w-5"></i>
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          
          {(technicalSkills.length > 0 || softSkills.length > 0) && (
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-white pb-2">Skills</h2>
              
              {technicalSkills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold mb-2">Technical</h3>
                  <ul className="space-y-1">
                    {technicalSkills.map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-check mr-2 text-xs"></i>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {softSkills.length > 0 && (
                <div>
                  <h3 className="font-bold mb-2">Soft Skills</h3>
                  <ul className="space-y-1">
                    {softSkills.map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-check mr-2 text-xs"></i>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-8 md:col-span-2">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className={cn("text-2xl font-bold mb-3", textAccentClass)}>
                Professional Summary
              </h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
          
          {workExperience.length > 0 && (
            <div className="mb-8">
              <h2 className={cn("text-2xl font-bold mb-4", textAccentClass)}>
                Work Experience
              </h2>
              
              {workExperience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-start">
                    <div className={cn("mr-4 mt-1 h-4 w-4 rounded-full", accentClass)}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{exp.position}</h3>
                        <span className="text-gray-600 text-sm">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <h4 className={cn("text-base mb-2", textAccentClass)}>{exp.company}</h4>
                      {exp.description && <p className="text-gray-700">{exp.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {education.length > 0 && (
            <div>
              <h2 className={cn("text-2xl font-bold mb-4", textAccentClass)}>
                Education
              </h2>
              
              {education.map((edu, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-start">
                    <div className={cn("mr-4 mt-1 h-4 w-4 rounded-full", accentClass)}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{edu.degree}</h3>
                        {(edu.startDate || edu.endDate) && (
                          <span className="text-gray-600 text-sm">
                            {edu.startDate || ""} {edu.startDate && edu.endDate && "-"} {edu.endDate || ""}
                          </span>
                        )}
                      </div>
                      <h4 className={cn("text-base mb-2", textAccentClass)}>{edu.institution}</h4>
                      {edu.description && <p className="text-gray-700">{edu.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ModernTemplate.displayName = "ModernTemplate";

// Minimalist Template
export const MinimalistTemplate = forwardRef<
  HTMLDivElement,
  {
    data: ResumeData;
    colorClass: string;
    className?: string;
  }
>(({ data, colorClass, className }, ref) => {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
  } = data;

  const accentClass = `text-${colorClass}-600`;
  const borderClass = `border-${colorClass}-200`;

  const technicalSkills = skills.technical
    ? skills.technical.split(",").map((skill) => skill.trim())
    : [];
  
  const softSkills = skills.soft
    ? skills.soft.split(",").map((skill) => skill.trim())
    : [];

  return (
    <div ref={ref} className={cn("bg-white w-full p-8", className)}>
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Full Name"}</h1>
        <p className={cn("text-xl mb-4", accentClass)}>{personalInfo.jobTitle || "Job Title"}</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {personalInfo.email && (
            <div className="flex items-center text-sm">
              <i className="fas fa-envelope mr-2"></i>
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-sm">
              <i className="fas fa-phone mr-2"></i>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center text-sm">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center text-sm">
              <i className="fas fa-globe mr-2"></i>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className={cn("font-normal text-xl mb-2 uppercase tracking-wider border-b pb-1", accentClass, borderClass)}>
            Professional Summary
          </h2>
          <p className="text-gray-700 mt-4">{personalInfo.summary}</p>
        </div>
      )}
      
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className={cn("font-normal text-xl mb-6 uppercase tracking-wider border-b pb-1", accentClass, borderClass)}>
            Work Experience
          </h2>
          
          {workExperience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <h4 className="text-gray-700 mb-2">{exp.company}</h4>
              {exp.description && <p className="text-gray-600">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className={cn("font-normal text-xl mb-6 uppercase tracking-wider border-b pb-1", accentClass, borderClass)}>
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg">{edu.degree}</h3>
                {(edu.startDate || edu.endDate) && (
                  <span className="text-gray-600 text-sm">
                    {edu.startDate || ""} {edu.startDate && edu.endDate && "-"} {edu.endDate || ""}
                  </span>
                )}
              </div>
              <h4 className="text-gray-700 mb-2">{edu.institution}</h4>
              {edu.description && <p className="text-gray-600">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {(technicalSkills.length > 0 || softSkills.length > 0) && (
        <div>
          <h2 className={cn("font-normal text-xl mb-6 uppercase tracking-wider border-b pb-1", accentClass, borderClass)}>
            Skills
          </h2>
          
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {technicalSkills.length > 0 && (
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-bold mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, index) => (
                    <span key={index} className={cn("inline-block px-3 py-1 rounded-full border", borderClass)}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {softSkills.length > 0 && (
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-bold mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <span key={index} className={cn("inline-block px-3 py-1 rounded-full border", borderClass)}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
MinimalistTemplate.displayName = "MinimalistTemplate";
