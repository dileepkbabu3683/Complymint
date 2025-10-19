// App.js
import React, { useEffect } from "react";
import "./App.css";

export default function App() {
  useEffect(() => {
    // ensure top bar matches end contact (mimics original script)
    const topEmailEl = document.getElementById("topEmail");
    const topPhoneEl = document.getElementById("topPhone");
    if (topEmailEl) topEmailEl.textContent = "info@complymint.eu";
    if (topPhoneEl) topPhoneEl.textContent = "353 - 894533581";
  }, []);

  function copyText(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const txt = el.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(txt)
        .then(() => alert("Copied: " + txt))
        .catch(() => alert("Copy failed — copy manually"));
    } else {
      // fallback
      const area = document.createElement("textarea");
      area.value = txt;
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        alert("Copied: " + txt);
      } catch {
        alert("Copy failed — copy manually");
      } finally {
        document.body.removeChild(area);
      }
    }
  }

  return (
    <div>
      <div className="topbar" role="banner">
        <div>
          Tel: <strong id="topPhone">353 - 894533581</strong> · Email:{" "}
          <strong id="topEmail">info@complymint.eu</strong>
        </div>
        <div>
          <a href="#contact-end">Contact</a>
          <a href="#services" style={{ marginLeft: 12 }}>
            Services
          </a>
        </div>
      </div>

      <div className="container" role="main">
        <header>
          <a className="brand" href="/">
            <svg
              className="logo"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="ComplyMint logo"
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#10b981" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
              </defs>
              <g transform="translate(6,4)" fill="none" fillRule="evenodd">
                <path
                  d="M26 2c7 3 12 7 12 16 0 15-12 22-18 24-6-2-18-9-18-24 0-9 5-13 12-16 3-1 6-2 12-0z"
                  fill="url(#g)"
                />
                <path
                  d="M14 18c4 1 8 0 10-4"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <strong style={{ fontSize: 18 }}>ComplyMint</strong>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>AML Consulting — Ireland</span>
            </div>
          </a>

          <nav aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact-end">Contact</a>
          </nav>

          <a className="cta" href="#contact-end">
            Request a proposal
          </a>
        </header>

        <section className="hero" aria-labelledby="heroTitle">
          <h1 id="heroTitle">Established AML consultancy supporting regulated firms across Ireland</h1>
          <p className="lead">
            ComplyMint combines regulator-facing experience with practical delivery. We help firms reduce financial crime risk and build
            regulator-ready programmes.
          </p>

          <div className="grid">
            <div>
              <div id="services" className="card" aria-labelledby="servicesTitle">
                <h2 id="servicesTitle">Our core services</h2>

                <div className="services">
                  <div className="svc">
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#10b981" d="M12 1l8 4v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-4z" />
                      <path fill="#fff" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                    </svg>
                    <div>
                      <h3>Risk Assessment / Business-wide risk review</h3>
                      <p>
                        Comprehensive AML risk assessments mapping products, customers, geographies and channels. Deliverables include risk
                        scoring, heat maps and remediation priorities tied to regulatory impact.
                      </p>
                    </div>
                  </div>

                  <div className="svc">
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="7" r="3" fill="#10b981" />
                      <path d="M5 20c1-4 5-6 7-6s6 2 7 6" fill="#0b1220" opacity="0.08" />
                    </svg>
                    <div>
                      <h3>Policies, Procedures & Governance</h3>
                      <p>
                        Drafting and reviewing AML/KYC policies, internal procedures and governance frameworks — ensuring roles, escalation
                        paths and record-keeping meet supervisory expectations.
                      </p>
                    </div>
                  </div>

                  <div className="svc">
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#10b981" d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                    </svg>
                    <div>
                      <h3>Client Due Diligence (CDD &amp; EDD)</h3>
                      <p>
                        Tailored CDD and EDD for complex structures, beneficial ownership investigations and high-risk onboarding, with
                        documented risk rationale and supporting evidence packs.
                      </p>
                    </div>
                  </div>

                  <div className="svc">
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <rect width="18" height="12" x="3" y="6" rx="2" fill="#10b981" />
                      <path d="M7 10h10v2H7z" fill="#fff" />
                    </svg>
                    <div>
                      <h3>Staff Training &amp; Awareness</h3>
                      <p>
                        Role-based training: executive briefings, MLRO upskilling, frontline onboarding and bespoke workshops using practical
                        scenarios and case studies.
                      </p>
                    </div>
                  </div>

                  <div className="svc">
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#10b981" d="M5 3h14v4H5z" />
                      <path d="M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" fill="#0b1220" opacity="0.06" />
                    </svg>
                    <div>
                      <h3>Audits, Reviews &amp; Remediation</h3>
                      <p>
                        Independent control testing and audits with clear remediation roadmaps, implementation oversight and follow-up
                        reporting to demonstrate completed actions to supervisors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="about" className="card about">
                <h2>About ComplyMint</h2>
                <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
                  Our team is composed of senior AML and compliance professionals who have led compliance functions in global banks, payment
                  firms and regulated fintechs. Many of our consultants have 10+ years’ experience in regulatory, operations and financial
                  crime roles and have direct experience preparing for supervisory reviews and inspections.
                </p>

                <div className="trust" aria-hidden="false" style={{ marginTop: 12 }}>
                  <div className="item">Regulator-aware</div>
                  <div className="item">GDPR compliant</div>
                  <div className="item">Confidential engagements</div>
                  <div className="item">Practical, implementable advice</div>
                </div>

                <p style={{ marginTop: 12, color: "var(--muted)" }}>
                  We deliver evidence-based recommendations, clear ownership of remedial actions, and transfer of capability through training.
                  We work with banks, payment institutions, e-money firms, brokerages and professional services across Ireland and the EU.
                </p>
              </div>
            </div>

            <aside className="card">
              <strong>Engagement formats</strong>
              <p style={{ marginTop: 8, color: "var(--muted)" }}>
                Fixed scope projects, retainers for ongoing compliance support, interim MLRO/Compliance cover, and tailored training packages.
              </p>

              <div style={{ marginTop: 12 }}>
                <strong>Why clients choose us</strong>
                <ul style={{ margin: "8px 0 0 18px", color: "var(--muted)" }}>
                  <li>Regulator-experienced leadership</li>
                  <li>Clear, evidence-based deliverables</li>
                  <li>Minimal disruption to operations</li>
                </ul>
              </div>

              <div style={{ marginTop: 14 }}>
                <strong>Quick contact</strong>
                <p style={{ margin: "6px 0 0" }}>info@complymint.eu</p>
                <p style={{ margin: "6px 0 0" }}>353 - 894533581</p>
                <div style={{ marginTop: 10 }}>
                  <a
                    className="small-btn"
                    href="#contact-end"
                    style={{
                      textDecoration: "none",
                      padding: 8,
                      border: "1px solid rgba(6,12,34,0.06)",
                      borderRadius: 8,
                    }}
                  >
                    Get a proposal
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <section id="testimonials" className="card testimonials" aria-labelledby="testTitle" style={{ marginTop: 18 }}>
            <h2 id="testTitle">Client feedback</h2>
            <div className="quote">
              <strong>
                “Practical, clear and responsive — ComplyMint helped us close critical gaps ahead of a regulatory review.”
              </strong>
              <div className="muted" style={{ marginTop: 6 }}>
                — Compliance Lead, Financial Services (anonymous)
              </div>
            </div>
            <div className="quote">
              <strong>
                “Their team delivered pragmatic policies and training that made a real difference to our frontline colleagues.”
              </strong>
              <div className="muted" style={{ marginTop: 6 }}>
                — Head of Operations, Fintech (anonymous)
              </div>
            </div>
          </section>
        </section>

        <section id="contact-end" className="contact-end" aria-labelledby="contactTitle">
          <h2 id="contactTitle">Contact ComplyMint</h2>
          <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>
            For enquiries, retainer proposals or an initial confidential discussion, please contact our Ireland team.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div className="card">
              <strong>General enquiries</strong>
              <p id="emailText" style={{ marginTop: 8, fontWeight: 700 }}>
                info@complymint.eu
              </p>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button className="small-btn" onClick={() => copyText("#emailText")}>
                  Copy
                </button>
                <a id="mailtoBtn" className="small-btn" href="mailto:info@complymint.eu">
                  Email
                </a>
              </div>
            </div>

            <div className="card">
              <strong>Phone</strong>
              <p id="phoneText" style={{ marginTop: 8, fontWeight: 700 }}>
                353 - 894533581
              </p>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button className="small-btn" onClick={() => copyText("#phoneText")}>
                  Copy
                </button>
                <a id="callBtn" className="small-btn" href="tel:+353894533581">
                  Call
                </a>
              </div>
            </div>
          </div>

          <p style={{ marginTop: 12, color: "var(--muted)" }}>
            ComplyMint is a private consultancy operating in Ireland. All engagements are governed by written terms and confidentiality agreements where required.
          </p>
        </section>

        <footer>
          <p style={{ marginTop: 18, color: "var(--muted)" }}>© ComplyMint — AML Consultancy, Ireland.</p>
        </footer>
      </div>
    </div>
  );
}
