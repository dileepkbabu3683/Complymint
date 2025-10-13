import React, { useState } from 'react'; // Added useState
import { Mail, Phone, ArrowRight, Shield, FileCheck, Users, TrendingUp, FileSearch, Settings, CheckCircle, BarChart, CheckCircle2, X } from 'lucide-react';

// --- UTILITY FUNCTIONS (cva and cn replacements) ---

/**
 * Custom implementation of the `cn` utility (similar to clsx/tailwind-merge)
 * for conditionally joining class names together.
 */
const cn = (...inputs) => {
  return inputs.flat().filter(Boolean).join(' ');
};

// --- COMPONENT: Card (Used in Services and Modal) ---

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("rounded-2xl border bg-card text-card-foreground shadow-card", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// --- COMPONENT: Button ---

const getButtonClasses = ({ variant, size, className }) => {
  // Base classes pulled from your original buttonVariants definition
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";
  
  // Size variants
  let sizeClasses;
  switch (size) {
    case 'sm':
      sizeClasses = "h-9 rounded-md px-3";
      break;
    case 'lg':
      sizeClasses = "h-11 rounded-md px-8";
      break;
    case 'icon':
      sizeClasses = "h-10 w-10";
      break;
    case 'default':
    default:
      sizeClasses = "h-10 px-4 py-2";
      break;
  }

  // Variant classes
  let variantClasses;
  switch (variant) {
    case 'destructive':
      variantClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      break;
    case 'outline':
      variantClasses = "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground";
      break;
    case 'secondary':
      variantClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    case 'ghost':
      variantClasses = "hover:bg-accent hover:text-accent-foreground";
      break;
    case 'link':
      variantClasses = "text-primary underline-offset-4 hover:underline";
      break;
    case 'accent':
      // Includes custom shadow/transition
      variantClasses = "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all";
      break;
    case 'default':
    default:
      variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90";
      break;
  }

  return cn(baseClasses, sizeClasses, variantClasses, className);
};

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
  const classes = getButtonClasses({ variant, size, className });
  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

// --- COMPONENT: Consultation Modal (NEW) ---

const ConsultationModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to construct and open the mailto link
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !phone) {
      // Using console.error instead of alert
      console.error("Please provide both email and phone number.");
      return;
    }

    const recipient = "info@complymint.eu";
    const subject = "New Consultation Request from ComplYmint Website";
    const body = `
Dear ComplYmint Team,

I would like to schedule a compliance consultation.

Contact Details:
Email: ${email}
Phone: ${phone}

Please contact me at your earliest convenience.

Thank you.
    `;
    
    // URL encode the body for the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body.trim())}`;
    
    // Open the email client
    window.location.href = mailtoLink;

    // Show confirmation message in the modal
    setIsSubmitted(true);

    // Reset state after a delay and close
    setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setPhone('');
        onClose();
    }, 2000); 
  };

  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      {/* Modal Content - stopPropagation prevents closing when clicking inside the form */}
      <Card 
        className="max-w-md w-full p-8 relative shadow-2xl animate-scale-in" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
            aria-label="Close modal"
        >
            <X className="w-5 h-5" />
        </button>
        
        {isSubmitted ? (
            <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                    Your request is ready. Please confirm and **send the pre-filled email** in your email client to complete the consultation request.
                </p>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold text-primary mb-2">Schedule Your Consultation</h3>
                <p className="text-muted-foreground mb-6">
                    Enter your details below. We will then generate an email for you to send to **info@complymint.eu**.
                </p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@firmname.ie"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors bg-muted/50"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="+353 (0) XX XXX XXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors bg-muted/50"
                        />
                    </div>
                </div>

                <Button type="submit" variant="accent" className="w-full mt-6">
                    Generate Email Request
                </Button>
            </form>
        )}
      </Card>
    </div>
  );
};

// --- SECTION: Hero ---

const Hero = () => {
  // Updated placeholder image URL:
  const heroImageUrl = "https://placehold.co/1920x1080/1a324e/1a324e?text="; // Text is now empty

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImageUrl} 
          alt="Abstract professional background" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/1a324e/1a324e"; }}
        />
        {/* Adjusted opacity of the gradient overlay for a slightly darker blend */}
        <div className="absolute inset-0 bg-gradient-hero opacity-95" /> 
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">Trusted by Leading Irish Accounting Firms</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            AML Compliance <br />
            <span className="text-accent">Made Simple</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-2xl leading-relaxed opacity-90">
            Tech-driven AML solutions helping Irish accounting firms meet regulatory obligations with confidence and efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              variant="accent"
              // Handler is now passed down from the App component via props, but since Hero is not receiving props, 
              // I will leave it as a general link and handle the openModal in the CTA section below.
              className="text-lg px-8 py-6 group"
            >
              Get Started Today
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              // Explicitly ensuring this button text remains light
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

// --- SECTION: Services ---

const services = [
  {
    icon: Shield,
    title: "AML Compliance Programs",
    description: "Comprehensive anti-money laundering frameworks tailored to your firm's specific needs and regulatory requirements.",
  },
  {
    icon: FileCheck,
    title: "Risk Assessment",
    description: "Detailed risk assessments and ongoing monitoring to identify and mitigate potential compliance vulnerabilities.",
  },
  {
    icon: Users,
    title: "Staff Training",
    description: "Expert-led training programs ensuring your team understands and implements AML procedures effectively.",
  },
  {
    icon: TrendingUp,
    title: "Regulatory Updates",
    description: "Stay ahead of regulatory changes with our continuous monitoring and compliance advisory services.",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AML solutions designed for Irish accounting firms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-scale-in border-border bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-accent flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION: WhyChoose ---

const benefits = [
  "Ireland-specific regulatory expertise",
  "Tech-driven compliance solutions",
  "Proven track record with accounting firms",
  "Continuous regulatory monitoring",
  "Dedicated support team",
  "Cost-effective compliance management",
];

const WhyChoose = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Why Choose ComplYmint?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We understand the unique challenges facing Irish accounting firms. Our specialized approach combines regulatory expertise with innovative technology to deliver compliance solutions that work.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="bg-gradient-primary rounded-2xl p-12 shadow-elegant">
              <div className="space-y-8">
                {/* Explicitly setting text-white for statistics in the dark box */}
                <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 text-center">
                  <div className="text-5xl font-bold text-accent mb-2">100%</div>
                  <div className="text-white text-lg">Regulatory Compliance Rate</div>
                </div>
                
                <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 text-center">
                  <div className="text-5xl font-bold text-accent mb-2">50+</div>
                  <div className="text-white text-lg">Irish Firms Served</div>
                </div>
                
                <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 text-center">
                  <div className="text-5xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-white text-lg">Expert Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECTION: Process ---

const steps = [
  {
    icon: FileSearch,
    title: "Assessment",
    description: "We conduct a thorough review of your current AML processes and identify gaps.",
  },
  {
    icon: Settings,
    title: "Implementation",
    description: "Custom compliance framework designed and implemented for your firm.",
  },
  {
    icon: CheckCircle,
    title: "Training",
    description: "Comprehensive staff training ensures everyone understands their responsibilities.",
  },
  {
    icon: BarChart,
    title: "Monitoring",
    description: "Ongoing support and monitoring to maintain compliance excellence.",
  },
];

const Process = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Our Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined approach to achieving AML compliance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-semibold text-accent mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- SECTION: CTA (Updated to accept onClick handler) ---

const CTA = ({ openModal }) => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden rounded-2xl mx-4 sm:mx-auto max-w-7xl my-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Simplify Your AML Compliance?
          </h2>
          <p className="text-xl text-white mb-12 leading-relaxed opacity-90">
            Join the growing number of Irish accounting firms who trust ComplYmint for their regulatory compliance needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              size="lg" 
              variant="accent"
              className="text-lg px-8 py-6 group"
              onClick={openModal} // Attached modal open handler
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-white/90">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="text-sm opacity-75">Email us</div>
                <a href="mailto:info@complymint.eu" className="font-semibold hover:text-accent transition-colors">info@complymint.eu</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="text-sm opacity-75">Call us</div>
                <a href="tel:+353894533581" className="font-semibold hover:text-accent transition-colors">+353 894533581</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SECTION: Footer ---

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Explicitly using 'text-white' on the footer element
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">ComplYmint</span>
            </div>
            {/* Using text-white/80 for muted text */}
            <p className="text-white/80 mb-4 max-w-md">
              Professional AML compliance solutions for Irish accounting firms. 
              Ensuring regulatory excellence through innovative, tech-driven services.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            {/* Using text-white/80 for links */}
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-accent transition-colors">AML Compliance</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Risk Assessment</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Staff Training</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Regulatory Updates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            {/* Using text-white/80 for links */}
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Using text-white/60 for copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; {currentYear} ComplYmint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


// --- MAIN APPLICATION COMPONENT ---

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <style>
        {`
        /* --- DESIGN SYSTEM: CUSTOM CSS VARIABLES --- */
        @layer base {
          :root {
            --background: 0 0% 100%;
            --foreground: 215 25% 15%;

            --card: 0 0% 100%;
            --card-foreground: 215 25% 15%;

            --popover: 0 0% 100%;
            --popover-foreground: 215 25% 15%;

            --primary: 215 45% 18%; /* Dark Blue */
            --primary-foreground: 0 0% 100%; 

            --secondary: 160 60% 95%;
            --secondary-foreground: 215 45% 18%;

            --muted: 210 30% 96%;
            --muted-foreground: 215 15% 46%;

            --accent: 160 65% 55%; /* Teal/Mint Green */
            --accent-foreground: 0 0% 100%;

            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 0 0% 98%;

            --border: 215 20% 88%;
            --input: 215 20% 88%;
            --ring: 160 65% 55%;

            --radius: 0.75rem;

            /* Brand gradients (must use linear-gradient for CSS variables) */
            --gradient-primary: linear-gradient(135deg, hsl(215 45% 18%) 0%, hsl(215 50% 25%) 100%);
            --gradient-accent: linear-gradient(135deg, hsl(160 65% 55%) 0%, hsl(160 70% 45%) 100%);
            --gradient-hero: linear-gradient(135deg, hsl(215 45% 18%) 0%, hsl(200 45% 25%) 50%, hsl(160 65% 35%) 100%);
            
            /* Shadows */
            --shadow-elegant: 0 20px 60px -15px hsl(215 45% 18% / 0.15);
            --shadow-card: 0 10px 30px -10px hsl(215 45% 18% / 0.1);
          }

          /* Dark Mode support (included for completeness) */
          .dark {
            --background: 215 25% 10%;
            --foreground: 0 0% 98%;
            --card: 215 25% 12%;
            --card-foreground: 0 0% 98%;
            --primary: 0 0% 98%;
            --primary-foreground: 215 45% 18%;
            --secondary: 160 30% 20%;
            --secondary-foreground: 0 0% 98%;
            --muted: 215 20% 18%;
            --muted-foreground: 215 15% 65%;
            --accent: 160 65% 55%;
            --accent-foreground: 0 0% 100%;
            --border: 215 20% 22%;
            --input: 215 20% 22%;
            --ring: 160 65% 55%;
          }
        }

        /* --- BASE STYLES AND TAILWIND HOOKS --- */
        @layer base {
          * {
            border-color: hsl(var(--border));
          }

          body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
          }
          
          /* CRITICAL FIX: Ensure pure white is available regardless of custom color definitions */
          .text-white {
            color: hsl(0 0% 100%);
          }
        }

        /* Custom utility classes that reference CSS variables for gradients and shadows */
        .bg-gradient-primary { background-image: var(--gradient-primary); }
        .bg-gradient-accent { background-image: var(--gradient-accent); }
        .bg-gradient-hero { background-image: var(--gradient-hero); }
        .shadow-elegant { box-shadow: var(--shadow-elegant); }
        .shadow-card { box-shadow: var(--shadow-card); }

        /* Keyframes for custom animations (fade-in, scale-in) */
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { transform: translateY(0); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        /* Animation utility classes */
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; }

        /* Container settings to match the original config's container behavior */
        .container {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px) { /* sm */
          .container { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
        @media (min-width: 1024px) { /* lg */
          .container { padding-left: 2rem; padding-right: 2rem; }
        }
        @media (min-width: 1400px) { /* 2xl (custom) */
          .container { max-width: 1400px; }
        }
        `}
      </style>
      
      {/* This div contains all the sections, including Services and Footer */}
      <div className="min-h-screen">
        <Hero />
        <Services />
        <WhyChoose />
        <Process />
        {/* Pass the handler to open the modal */}
        <CTA openModal={() => setIsModalOpen(true)} /> 
        <Footer />
      </div>

      {/* Render the modal, controlled by state */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default App;

