import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-8 mt-12 no-print">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-xl font-semibold font-sans">ResumeBuilder</h2>
            </div>
            <p className="mt-2 text-muted-foreground max-w-md">
              Create professional resumes in minutes with our easy-to-use builder. 
              Choose from multiple templates and customize to your needs.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    Resume Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    Career Advice
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
