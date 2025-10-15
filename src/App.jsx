import React, { useState } from "react";
import {
  Mail,
  Phone,
  ArrowRight,
  Shield,
  FileCheck,
  Users,
  TrendingUp,
  FileSearch,
  Settings,
  CheckCircle,
  BarChart,
  CheckCircle2,
  X,
} from "lucide-react";

/* ---------- small utility helpers (cn) ---------- */
const cn = (...args) => args.flat().filter(Boolean).join(" ");

/* ---------- Simple Card component ---------- */
const Card = ({ className = "", children, ...props }) => (
  <div className={cn("rounded-2xl border bg-card text-card-foreground shadow-card", className)} {...props}>
    {children}
  </div>
);

/* ---------- Button component (simple) ---------- */
const Button = React.forwardRef(({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition";
  const sizes = {
    default: "px-4 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    sm: "px-3 py-2 text-sm",
  };
  const variants = {
    default: "bg-primary text-white hover:opacity-95",
    accent: "bg-accent text-accent-foreground hover:opacity-95 shadow-lg",
    outline: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary",
  };
  return (
    <button ref={ref} className={cn(base, sizes[size] ?? sizes.default, variants[variant] ?? variants.default, className)} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

/* ---------- Consultation modal (collects name/email/phone) ---------- */
const ConsultationModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const sendMail = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    const recipient = "info@complymint.eu";
    const subject = "Consultation Request - Complymint AML Services";
    const body = [
      `Hello Complymint Team,`,
      ``,
      `I would like to request a consultation regarding AML compliance.`,
      ``,
      `Name: ${name || "[Your name]"}`,
      `Email: ${email}`,
      `Phone: ${phone || "[Phone]"}`,
      ``,
      `Preferred contact time: [please add]`,
      ``,
      `Message: [please add any details here]`,
      ``,
      `Kind regards,`,
      `${name || ""}`,
    ].join("\n");

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // open the user's mail client
    window.location.href = mailto;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <Card className="max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 p-1 rounded hover:bg-muted">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="mx-auto w-14 h-14 text-accent mb-4" />
            <h3 className="text-2xl font-semibold">Thank you</h3>
            <p className="mt-2 text-muted-foreground">Your consultation email has been prepared in your email client — please send it to complete the request.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-2">Request a Consultation</h3>
            <p className="text-muted-foreground mb-4">Complete the form and we'll open an email for you to send to our team.</p>

            <form onSubmit={sendMail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="Jane Doe" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input required value={email} type="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="you@company.ie" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="+353 89 123 4567" />
              </div>

              <Button type="submit" variant="accent" className="w-full">Send Consultation Email</Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

/* ---------- Images (Unsplash) — replace with local assets if preferred ---------- */
const heroImage = "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=9d2b3e3c5f22a5b7a3a1d0d4a2bf6a99";
const teamImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=ba4c5d3b9d2d3b2d6f2f8dc3b9b4edc2";
const trainingImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=ab9d1a4b1c2d3e4f5a6b7c8d9e0f1a2b";

/* ---------- Nav + smooth scroll helper ---------- */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ---------- Main site sections ---------- */

const Hero = ({ onSchedule }) => {
  return (
    <header id="home" className="relative min-h-[70vh] lg:min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional compliance workspace"
          className="w-full h-full object-cover brightness-75"
          onError={(e) => { e.target.onerror = null; e.target.src = heroImage; }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0b2846]/80 via-[#0f4d55]/60 to-transparent" />
      </div>

      <nav className="relative z-10 container flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full w-10 h-10 bg-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-bold text-white text-lg">Complymint</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-white">
          <button onClick={() => scrollToId("about")} className="hover:underline">About</button>
          <button onClick={() => scrollToId("services")} className="hover:underline">Services</button>
          <button onClick={() => scrollToId("training")} className="hover:underline">Training</button>
          <button onClick={() => scrollToId("contact")} className="hover:underline">Contact</button>
        </div>

        <div className="flex items-center gap-3">
          <a className="hidden md:inline text-white/90" href="mailto:info@complymint.eu">info@complymint.eu</a>
          <Button variant="outline" size="sm" className="hidden md:inline" onClick={() => window.location.href = `mailto:info@complymint.eu?subject=${encodeURIComponent("Consultation Request - Complymint AML Services")}&body=${encodeURIComponent("Hello Complymint team,%0D%0A%0D%0AI would like to request a consultation regarding AML compliance.%0D%0A%0D%0AName:%20%0D%0ACompany:%20%0D%0AEmail:%20%0D%0APhone:%20%0D%0A%0D%0APlease contact me to arrange a time.%0D%0A%0D%0AKind regards,")}`}>Email Us</Button>
          <button className="md:hidden text-white" onClick={() => scrollToId("contact")} aria-label="Open contact">Contact</button>
        </div>
      </nav>

      <div className="container relative z-10 py-12 flex flex-col lg:flex-row items-center gap-8">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-6 backdrop-blur">
            <Shield className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm">Trusted by Irish accounting firms</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            AML Compliance <span className="text-accent">Made Simple</span>
          </h1>

          <p className="text-lg text-white/90 mb-6">
            Practical Anti-Money Laundering solutions for SMEs — client due diligence, risk assessments, policies and staff training that regulators trust.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="accent" size="lg" onClick={() => window.location.href = `mailto:info@complymint.eu?subject=${encodeURIComponent("Consultation Request - Complymint AML Services")}&body=${encodeURIComponent("Hello Complymint team,%0D%0A%0D%0AI would like to request a consultation regarding AML compliance.%0D%0A%0D%0AName:%20%0D%0ACompany:%20%0D%0AEmail:%20%0D%0APhone:%20%0D%0A%0D%0APlease contact me to arrange a time.%0D%0A%0D%0AKind regards,")}` }>
              Schedule Consultation <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToId("services")}>View Services</Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {/* small feature cards or stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white/6 rounded-lg">
              <div className="text-sm text-white/80">Clients served</div>
              <div className="text-2xl font-bold text-white">50+</div>
            </div>
            <div className="p-4 bg-white/6 rounded-lg">
              <div className="text-sm text-white/80">Compliance rate</div>
              <div className="text-2xl font-bold text-white">100%</div>
            </div>
            <div className="p-4 bg-white/6 rounded-lg">
              <div className="text-sm text-white/80">Support</div>
              <div className="text-2xl font-bold text-white">24/7</div>
            </div>
            <div className="p-4 bg-white/6 rounded-lg">
              <div className="text-sm text-white/80">Years combined</div>
              <div className="text-2xl font-bold text-white">10+</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const About = () => (
  <section id="about" className="py-20">
    <div className="container grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-primary">About Complymint</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Complymint is a specialist AML consultancy providing practical, regulator-aligned compliance solutions to small and medium enterprises. Our consultants have worked across financial services, legal, accounting and property sectors to deliver risk-based frameworks that work.
        </p>
        <p className="text-muted-foreground mb-6">
          We combine regulatory knowledge with operational insight to deliver policies, training and monitoring processes tailored to your business.
        </p>

        <div className="flex gap-3">
          <Button variant="accent" onClick={() => window.location.href = `mailto:info@complymint.eu?subject=${encodeURIComponent("Consultation Request - Complymint AML Services")}&body=${encodeURIComponent("Hello Complymint team,%0D%0A%0D%0AI would like to request a consultation regarding AML compliance.%0D%0A%0D%0AName:%20%0D%0ACompany:%20%0D%0AEmail:%20%0D%0APhone:%20%0D%0A%0D%0APlease contact me to arrange a time.%0D%0A%0D%0AKind regards,")}` }>
            Schedule Consultation
          </Button>
          <Button variant="outline" onClick={() => scrollToId("services")}>View Services</Button>
        </div>
      </div>

      <div>
        <img src={teamImage} alt="Complymint consultants" className="w-full rounded-xl object-cover shadow-card" />
      </div>
    </div>
  </section>
);

const ServicesSection = () => {
  const services = [
    { icon: FileSearch, title: "Client Due Diligence", desc: "Onboarding, verification and ongoing monitoring to meet regulatory expectations." },
    { icon: FileCheck, title: "Policy & Procedure", desc: "AML policies and escalation procedures tailored to your organisation." },
    { icon: Settings, title: "AML Risk Assessment", desc: "Risk-based assessments and remediation roadmaps." },
    { icon: Users, title: "Staff Training", desc: "Practical training modules for staff at all levels." },
  ];

  return (
    <section id="services" className="py-20 bg-muted/40">
      <div className="container">
        <h3 className="text-3xl font-bold text-center mb-6 text-primary">Our Services</h3>
        <p className="text-center max-w-2xl mx-auto text-muted-foreground mb-10">Comprehensive AML services designed for SMEs and accounting firms.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Card key={i} className="p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold mb-2">{s.title}</h4>
              <p className="text-muted-foreground">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Training = () => (
  <section id="training" className="py-20">
    <div className="container grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-3xl font-bold mb-4 text-primary">Training & Development</h3>
        <p className="text-muted-foreground mb-4">
          Tailored AML training for teams — from induction sessions to MLRO masterclasses. We deliver practical sessions focused on real-world scenarios.
        </p>

        <ul className="space-y-3 text-muted-foreground mb-6">
          <li>• AML Fundamentals for SMEs</li>
          <li>• Customer Due Diligence Best Practice</li>
          <li>• Suspicious Transaction Identification & Reporting</li>
          <li>• Ongoing Monitoring & Record Keeping</li>
        </ul>

        <div className="flex gap-3">
          <Button variant="accent" onClick={() => window.location.href = `mailto:info@complymint.eu?subject=${encodeURIComponent("Training Inquiry - Complymint AML Training")}&body=${encodeURIComponent("Hello,%0D%0A%0D%0AI am interested in AML training. Please provide details and pricing.%0D%0A%0D%0ACompany:%20%0D%0AContact:%20%0D%0A%0D%0AKind regards,")}`}>Request Training</Button>
          <Button variant="outline" onClick={() => scrollToId("contact")}>Contact Us</Button>
        </div>
      </div>

      <div>
        <img src={trainingImage} alt="AML training session" className="w-full rounded-xl object-cover shadow-card" />
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-secondary/20">
    <div className="container text-center max-w-3xl mx-auto">
      <h3 className="text-3xl font-bold text-primary mb-4">What our clients say</h3>

      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <p className="text-muted-foreground mb-4">“Complymint helped us completely rework our CDD processes — they made it straightforward and regulator-ready.”</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">C</div>
            <div className="text-left">
              <div className="font-semibold">Compliance Lead, FinTech</div>
              <div className="text-sm text-muted-foreground">Financial Services</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-muted-foreground mb-4">“Their training was clear and practical; our staff now understand how to identify suspicious activity.”</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">R</div>
            <div className="text-left">
              <div className="font-semibold">Head of Operations</div>
              <div className="text-sm text-muted-foreground">Retail</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const Contact = ({ onOpenModal }) => (
  <section id="contact" className="py-20">
    <div className="container grid lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-3xl font-bold mb-4 text-primary">Get in touch</h3>
        <p className="text-muted-foreground mb-6">For consultations, training or compliance reviews, contact our team.</p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white"><Mail className="w-5 h-5" /></div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <a href="mailto:info@complymint.eu" className="font-semibold">info@complymint.eu</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white"><Phone className="w-5 h-5" /></div>
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <a href="tel:+353894533581" className="font-semibold">+353 89 453 3581</a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="accent" onClick={onOpenModal}>Schedule Consultation</Button>
          <Button variant="outline" onClick={() => window.location.href = `mailto:info@complymint.eu?subject=${encodeURIComponent("General enquiry - Complymint")}&body=${encodeURIComponent("Hello,%0D%0A%0D%0AI would like to enquire about your AML services.%0D%0A%0D%0ACompany:%20%0D%0AContact:%20%0D%0A%0D%0AKind regards,")}`}>Email</Button>
        </div>
      </div>

      <div>
        <Card className="p-6">
          <h4 className="font-semibold mb-3">Office</h4>
          <p className="text-muted-foreground mb-2">Dublin, Ireland</p>
          <p className="text-muted-foreground">We operate nationally and provide virtual sessions and on-site visits where required.</p>
        </Card>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"><Shield className="w-5 h-5 text-accent-foreground" /></div>
              <div className="font-bold">Complymint</div>
            </div>
            <div className="text-white/80 max-w-sm">Practical AML compliance support for small and medium enterprises. Client due diligence, risk assessment and staff training.</div>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Services</h5>
            <ul className="space-y-2 text-white/80">
              <li>Client Due Diligence</li>
              <li>Policy & Procedure</li>
              <li>Risk Assessment</li>
              <li>Training</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Contact</h5>
            <div className="text-white/80">
              <div>info@complymint.eu</div>
              <div>+353 89 453 3581</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 text-sm text-white/60 text-center">
          © {year} Complymint. All rights reserved. | Privacy Policy | Terms of Use
        </div>
      </div>
    </footer>
  );
};

/* ---------- Main app ---------- */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{`
        :root{
          --background: 0 0% 100%;
          --foreground: 215 25% 15%;
          --card: 0 0% 100%;
          --card-foreground: 215 25% 15%;
          --primary: 214 33% 15%; /* navy */
          --primary-foreground: 0 0% 100%;
          --accent: 170 58% 38%; /* teal */
          --accent-foreground: 0 0% 100%;
          --muted: 210 30% 96%;
          --muted-foreground: 215 15% 46%;
          --border: 215 20% 88%;
        }
        .bg-primary{ background-color: hsl(var(--primary)); }
        .bg-accent{ background-color: hsl(var(--accent)); }
        .text-primary{ color: hsl(var(--primary)); }
        .text-muted-foreground{ color: hsl(var(--muted-foreground)); }
        .shadow-card{ box-shadow: 0 10px 30px -10px rgba(13, 31, 53, 0.12); }
        .container{ max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .rounded{ border-radius: 0.5rem; }
        /* simple responsive helpers */
        @media (min-width: 768px){ .md\\:flex{ display:flex; } .md\\:grid{ display:grid; } .md\\:inline{ display:inline; } }
        @media (min-width: 1024px){ .lg\\:flex{ display:flex; } .lg\\:grid{ display:grid; } .lg\\:min-h\\[90vh\\]{ min-height:90vh; } }
      `}</style>

      <div className="min-h-screen bg-white">
        <Hero />
        <main>
          <About />
          <ServicesSection />
          <Training />
          <Testimonials />
          <Contact onOpenModal={() => setModalOpen(true)} />
        </main>

        <Footer />

        {/* modal */}
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  );
}
