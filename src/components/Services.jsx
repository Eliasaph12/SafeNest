import { useState } from "react";

const services = [
  {
    icon: "Law",
    title: "Legal Support",
    color: "#4A1B8C",
    bg: "#F0EBFF",
    roles: ["Legal Advisor", "Victim/Survivor"],
    description:
      "Access information on legal rights, restraining orders, and court procedures. Our legal advisors provide guidance on filing complaints and protection orders.",
    features: [
      "Know your legal rights as a survivor",
      "Step-by-step guide to filing complaints",
      "Connect with certified legal advisors",
      "Protection order assistance",
      "Case status tracking",
    ],
  },
  {
    icon: "Mind",
    title: "Counselling and Mental Health",
    color: "#0F6E56",
    bg: "#E1F5EE",
    roles: ["Counsellor", "Victim/Survivor"],
    description:
      "Confidential one-on-one support from trained counsellors. We provide trauma-informed care with compassionate, non-judgmental support.",
    features: [
      "Anonymous and confidential sessions",
      "Trauma-informed counsellors",
      "Online and offline session options",
      "Progress tracking and follow-ups",
      "Crisis intervention support",
    ],
  },
  {
    icon: "Shelter",
    title: "Safe Shelter and Emergency Aid",
    color: "#993C1D",
    bg: "#FAECE7",
    roles: ["Victim/Survivor", "Admin"],
    description:
      "Find verified safe houses, shelters, and emergency accommodation near you through partner organizations and emergency support networks.",
    features: [
      "Verified shelter directory by location",
      "24/7 emergency helpline integration",
      "Transportation assistance information",
      "Child-friendly shelter options",
      "Pet-friendly shelter listings",
    ],
  },
  {
    icon: "Library",
    title: "Resource Library",
    color: "#185FA5",
    bg: "#E6F1FB",
    roles: ["All Users"],
    description:
      "A curated library of articles, guides, videos, and toolkits on recognizing abuse, safety planning, and recovery.",
    features: [
      "Abuse recognition and warning signs",
      "Safety planning templates",
      "Multi-language resources",
      "Audio and video guides",
      "Downloadable legal document templates",
    ],
  },
  {
    icon: "Community",
    title: "Community Support Network",
    color: "#72243E",
    bg: "#FBEAF0",
    roles: ["Victim/Survivor", "Counsellor"],
    description:
      "Connect with survivors, peer supporters, and advocacy groups in a safe, moderated space built for solidarity and guidance.",
    features: [
      "Moderated survivor forums",
      "Peer support matching",
      "NGO and organization directory",
      "Advocacy and awareness campaigns",
      "Volunteer opportunities",
    ],
  },
  {
    icon: "Privacy",
    title: "Safety and Privacy Tools",
    color: "#444441",
    bg: "#F1EFE8",
    roles: ["Victim/Survivor", "Admin"],
    description:
      "Use quick-exit features, anonymous browsing, and private messaging tools designed to protect vulnerable users.",
    features: [
      "One-click quick exit button",
      "Anonymous account creation",
      "Encrypted private messaging",
      "Low-trace browsing support",
      "Secure document storage",
    ],
  },
];

const roleColors = {
  "Legal Advisor": { bg: "#E6F1FB", text: "#185FA5" },
  "Victim/Survivor": { bg: "#FBEAF0", text: "#72243E" },
  Counsellor: { bg: "#E1F5EE", text: "#0F6E56" },
  Admin: { bg: "#F1EFE8", text: "#444441" },
  "All Users": { bg: "#EEEDFE", text: "#534AB7" },
};

export default function Services({ onNavigate }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-rose-50/70">
      <div
        className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #2D1B4E 0%, #6B2D3E 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-[84rem]">
          <button
            className="mb-6 w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[clamp(0.95rem,1.2vw,1.1rem)] font-semibold text-white sm:mb-8 sm:w-auto"
            onClick={() => onNavigate("home")}
          >
            Back to Home
          </button>
          <div className="mx-auto max-w-[70rem] text-center">
            <span className="mb-4 inline-block rounded-full bg-white/15 px-5 py-2 text-[clamp(0.95rem,1.15vw,1.1rem)] font-medium text-rose-200">
              Our Services
            </span>
            <h1 className="mb-5 text-[clamp(2.85rem,5vw,5.8rem)] font-bold leading-[0.95] text-white">
              Support built around <span className="text-rose-300">your safety</span>
            </h1>
            <p className="mx-auto max-w-[58rem] text-[clamp(1.12rem,1.8vw,1.45rem)] text-white/75">
              Comprehensive, gender-responsive services designed to protect, empower,
              and connect survivors of domestic violence with the help they need.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[84rem] px-[clamp(1rem,3vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] bg-white transition-all duration-300"
              style={{
                boxShadow:
                  expanded === index
                    ? "0 20px 40px rgba(0,0,0,0.15)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                transform: expanded === index ? "translateY(-4px)" : "none",
                border: `1px solid ${service.bg}`,
              }}
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <div className="flex grow flex-col p-[clamp(1.5rem,2vw,2.2rem)]" style={{ borderBottom: `3px solid ${service.color}` }}>
                <div
                  className="mb-5 flex h-18 w-18 items-center justify-center rounded-2xl px-3 text-[clamp(0.95rem,1.05vw,1rem)] font-bold uppercase"
                  style={{ background: service.bg, color: service.color }}
                >
                  {service.icon}
                </div>
                <h3 className="mb-3 text-[clamp(1.5rem,2vw,2rem)] font-bold leading-[1.08]" style={{ color: service.color }}>
                  {service.title}
                </h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {service.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full px-3 py-1.5 text-[clamp(0.9rem,1vw,0.98rem)] font-medium"
                      style={{
                        background: roleColors[role]?.bg || "#F1EFE8",
                        color: roleColors[role]?.text || "#444441",
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <p className="grow text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-slate-600">{service.description}</p>
              </div>

              {expanded === index ? (
                <div className="p-[clamp(1.5rem,2vw,2.2rem)]" style={{ background: service.bg }}>
                  <p className="mb-4 text-[clamp(0.95rem,1vw,1rem)] font-semibold uppercase tracking-[0.22em]" style={{ color: service.color }}>
                    What's Included
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[clamp(1rem,1.15vw,1.1rem)]">
                        <span
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: service.color }}
                        >
                          +
                        </span>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-6 w-full rounded-xl py-4 text-[clamp(1rem,1.15vw,1.1rem)] font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: service.color }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    Explore Support
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 text-right text-[clamp(0.92rem,1vw,1rem)] text-slate-400 sm:px-7">Tap to explore</div>
              )}
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-12 max-w-5xl rounded-[1.75rem] p-[clamp(1.5rem,2.4vw,2.75rem)] text-center"
          style={{ background: "linear-gradient(135deg, #2D1B4E, #6B2D3E)" }}
        >
          <h2 className="mb-3 text-[clamp(2rem,3vw,3.4rem)] font-bold text-white">Are you in immediate danger?</h2>
          <p className="mb-7 text-[clamp(1.05rem,1.45vw,1.3rem)] text-rose-200">
            If you are in an emergency, please contact authorities immediately.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a className="w-full rounded-full bg-white px-8 py-4 text-center text-[clamp(1rem,1.2vw,1.15rem)] font-bold text-purple-900 transition-colors hover:bg-rose-100 sm:w-auto" href="tel:181">
              Call Women Helpline: 181
            </a>
            <a className="w-full rounded-full border-2 border-white px-8 py-4 text-center text-[clamp(1rem,1.2vw,1.15rem)] font-bold text-white transition-colors hover:bg-white hover:text-purple-900 sm:w-auto" href="tel:100">
              Police: 100
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
