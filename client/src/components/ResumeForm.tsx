import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resumeDataSchema, ResumeData } from "@shared/schema";
import { useResumeStore } from "@/lib/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle, Trash2 } from "lucide-react";

export default function ResumeForm() {
  const { resumeData, updateResumeData } = useResumeStore();
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Form schema with validation
  const formSchema = resumeDataSchema.extend({
    personalInfo: resumeDataSchema.shape.personalInfo.extend({
      fullName: z.string().min(1, "Full name is required"),
      jobTitle: z.string().min(1, "Job title is required"),
      email: z.string().email("Invalid email address").or(z.string().length(0)),
      phone: z.string().optional(),
    }),
  });

  // Initialize form with react-hook-form
  const form = useForm<ResumeData>({
    resolver: zodResolver(formSchema),
    defaultValues: resumeData,
    mode: "onBlur",
  });

  // Update the store when form values change
  const onFormChange = (formData: ResumeData) => {
    updateResumeData(formData);
  };

  // Add a new experience entry
  const addExperience = () => {
    const experiences = [...form.getValues().workExperience];
    experiences.push({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    
    form.setValue("workExperience", experiences);
    onFormChange(form.getValues());
  };

  // Remove an experience entry
  const removeExperience = (index: number) => {
    const experiences = [...form.getValues().workExperience];
    experiences.splice(index, 1);
    
    form.setValue("workExperience", experiences);
    onFormChange(form.getValues());
  };

  // Add a new education entry
  const addEducation = () => {
    const educations = [...form.getValues().education];
    educations.push({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    
    form.setValue("education", educations);
    onFormChange(form.getValues());
  };

  // Remove an education entry
  const removeEducation = (index: number) => {
    const educations = [...form.getValues().education];
    educations.splice(index, 1);
    
    form.setValue("education", educations);
    onFormChange(form.getValues());
  };

  return (
    <div className="resume-form lg:w-1/2 no-print mb-8 lg:mb-0">
      <Form {...form}>
        <form onChange={() => onFormChange(form.getValues())}>
          {/* Personal Information Section */}
          <div className="bg-card rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold font-sans mb-4 text-foreground border-b pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="personalInfo.fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className={
                          showValidationErrors && form.formState.errors.personalInfo?.fullName
                            ? "border-destructive"
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalInfo.jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Engineer"
                        {...field}
                        className={
                          showValidationErrors && form.formState.errors.personalInfo?.jobTitle
                            ? "border-destructive"
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        {...field}
                        className={
                          showValidationErrors && form.formState.errors.personalInfo?.email
                            ? "border-destructive"
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalInfo.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalInfo.summary"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Professional Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief overview of your professional background and key strengths"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalInfo.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, State"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalInfo.website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website/LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="linkedin.com/in/johndoe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="resume-form-section bg-card rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold font-sans text-foreground">
                Work Experience
              </h2>
              <Button
                type="button"
                variant="ghost"
                className="text-primary hover:text-primary/90"
                onClick={addExperience}
              >
                <PlusCircle className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>

            {form.getValues().workExperience.map((_, index) => (
              <div key={index} className="experience-entry border-b border-border pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ABC Corporation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Senior Developer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input
                            type="month"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`workExperience.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="month"
                                  {...field}
                                  disabled={form.getValues().workExperience[index].current}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-8">
                        <FormField
                          control={form.control}
                          name={`workExperience.${index}.current`}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    // Clear end date if current job
                                    if (checked) {
                                      const experiences = [...form.getValues().workExperience];
                                      experiences[index].endDate = "";
                                      form.setValue("workExperience", experiences);
                                      onFormChange(form.getValues());
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Current</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`workExperience.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="resume-form-section bg-card rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold font-sans text-foreground">
                Education
              </h2>
              <Button
                type="button"
                variant="ghost"
                className="text-primary hover:text-primary/90"
                onClick={addEducation}
              >
                <PlusCircle className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>

            {form.getValues().education.map((_, index) => (
              <div key={index} className="education-entry border-b border-border pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="University of Example"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bachelor of Science in Computer Science"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`education.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type="month"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`education.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            type="month"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`education.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Relevant coursework, honors, or activities"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="resume-form-section bg-card rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold font-sans text-foreground">
                Skills
              </h2>
            </div>
            
            <FormField
              control={form.control}
              name="skills.technical"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Technical Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JavaScript, React, Node.js (separate with commas)"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">Enter skills separated by commas</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skills.soft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soft Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Leadership, Communication, Problem Solving (separate with commas)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
