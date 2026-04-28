const teamRoles = [
  {
    role: "Admin",
    icon: "Shield",
    color: "#534AB7",
    bg: "#EEEDFE",
    description:
      "Manages platform content, user roles, data security, and ensures the app runs safely and effectively for all users.",
    responsibilities: [
      "Oversee user role management",
      "Maintain data privacy and security",
      "Moderate community content",
      "Update resources and legal information",
    ],
  },
  {
    role: "Victim / Survivor",
    icon: "Care",
    color: "#72243E",
    bg: "#FBEAF0",
    description:
      "At the heart of everything we do. Survivors can access resources, seek help, connect with professionals, and find community in a safe space.",
    responsibilities: [
      "Access legal and safety resources",
      "Connect with counsellors",
      "Use emergency helpline tools",
      "Join peer support communities",
    ],
  },
  {
    role: "Counsellor",
    icon: "Support",
    color: "#0F6E56",
    bg: "#E1F5EE",
    description:
      "Trained professionals providing emotional support, trauma counselling, and guided recovery to survivors on the platform.",
    responsibilities: [
      "Conduct one-on-one sessions",
      "Monitor survivor progress",
      "Provide crisis intervention",
      "Collaborate with legal advisors",
    ],
  },
  {
    role: "Legal Advisor",
    icon: "Law",
    color: "#185FA5",
    bg: "#E6F1FB",
    description:
      "Qualified legal professionals offering expert guidance on rights, court processes, protection orders, and navigating legal systems.",
    responsibilities: [
      "Offer legal consultations",
      "Update legal resource library",
      "Assist with court documentation",
      "Coordinate with law enforcement",
    ],
  },
];

const stats = [
  { value: "1 in 3", label: "Women globally experience domestic violence" },
  { value: "74%", label: "Cases go unreported due to fear and stigma" },
  { value: "40+", label: "Partner organizations in our support network" },
  { value: "24/7", label: "Emergency support availability" },
];

const values = [
  {
    icon: "Secure",
    title: "Safety First",
    desc: "Every feature is designed with survivor safety as the top priority, from anonymous browsing to quick-exit tools.",
  },
  {
    icon: "Equal",
    title: "Gender Equality",
    desc: "We recognize that domestic violence disproportionately affects women and gender minorities. Our approach is inclusive and intersectional.",
  },
  {
    icon: "Private",
    title: "Confidentiality",
    desc: "All user data is encrypted and never shared. Survivors can seek help without fear of exposure.",
  },
  {
    icon: "Access",
    title: "Accessibility",
    desc: "Resources are available in multiple languages and designed for low-bandwidth, mobile-first use.",
  },
];

export default function About({ onNavigate }) {
  return (
    <div className="min-h-screen bg-rose-50/70 text-slate-800">
      <div
        className="relative overflow-hidden px-[clamp(1rem,3vw,2rem)] py-[clamp(3.5rem,8vw,6rem)]"
        style={{ background: "linear-gradient(135deg, #1A0A2E 0%, #4A1528 100%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(180,100,130,0.30) 0%, transparent 60%)",
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
            <div className="mb-6 inline-block rounded-full bg-white/12 px-5 py-2 text-[clamp(0.95rem,1.15vw,1.1rem)] text-rose-200">
              About Us
            </div>
            <h1 className="mb-5 text-[clamp(2.85rem,5vw,5.8rem)] font-bold leading-[0.95] text-white">
              A gender-responsive platform to
              <span className="text-rose-300"> combat domestic violence</span>
            </h1>
            <p className="mx-auto max-w-[58rem] text-[clamp(1.12rem,1.8vw,1.45rem)] leading-relaxed text-white/75">
              We provide victims and survivors of domestic violence with immediate access to
              legal knowledge, professional counselling, safe shelters, and a compassionate
              community so no one has to face abuse alone.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[84rem] gap-[clamp(1.75rem,4vw,4rem)] px-[clamp(1rem,3vw,2rem)] py-[clamp(3rem,7vw,5rem)] xl:grid-cols-[minmax(0,1fr)_minmax(28rem,1fr)] xl:items-center">
        <div className="max-w-[42rem] xl:justify-self-end">
          <span className="text-[clamp(0.9rem,1vw,1rem)] font-semibold uppercase tracking-[0.28em] text-rose-800">
            Our Mission
          </span>
          <h2 className="mt-3 mb-5 text-[clamp(2.1rem,3.4vw,4rem)] font-bold leading-[1.02] text-slate-950">
            Breaking the cycle of abuse through technology
          </h2>
          <p className="mb-5 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-slate-600">
            Domestic violence is a pervasive human rights violation that affects millions
            across gender, class, and geography. Our platform bridges the gap between people
            who need help and the resources that can save lives.
          </p>
          <p className="mb-5 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-slate-600">
            By combining legal guidance, mental health support, emergency services, and
            community in one secure platform, we equip survivors with the tools and
            confidence to reclaim their lives.
          </p>
          <p className="text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-slate-600">
            We operate with a gender-responsive lens, recognizing that structural
            inequalities, social stigma, and health consequences of abuse require
            intersectional solutions.
          </p>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:max-w-[36rem] xl:justify-self-start">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex h-full flex-col items-center justify-center rounded-[1.5rem] p-[clamp(1.5rem,2vw,2.25rem)] text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              style={{
                background: index % 2 === 0 ? "linear-gradient(135deg, #2D1B4E, #6B2D3E)" : "white",
                border: index % 2 === 0 ? "none" : "1px solid #F0E6EA",
              }}
            >
              <p className="mb-2 text-[clamp(2.4rem,4vw,3.8rem)] font-bold leading-none" style={{ color: index % 2 === 0 ? "#FFB3C6" : "#4A1528" }}>
                {stat.value}
              </p>
              <p className="max-w-[18rem] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-snug" style={{ color: index % 2 === 0 ? "rgba(255,255,255,0.7)" : "#6B7280" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-[clamp(3rem,7vw,5rem)]">
        <div className="mx-auto max-w-[84rem] px-[clamp(1rem,3vw,2rem)]">
          <div className="mb-8 text-center sm:mb-10">
            <span className="text-[clamp(0.9rem,1vw,1rem)] font-semibold uppercase tracking-[0.28em] text-rose-800">
              What Guides Us
            </span>
            <h2 className="mt-3 text-[clamp(2rem,3vw,3.6rem)] font-bold text-slate-950">Our Core Values</h2>
          </div>
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex h-full flex-col rounded-[1.5rem] border border-rose-100 bg-rose-50/60 p-[clamp(1.5rem,2vw,2.25rem)] text-center transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-4 text-[clamp(1rem,1.15vw,1.1rem)] font-bold uppercase tracking-[0.24em] text-violet-700">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-[clamp(1.35rem,1.8vw,1.75rem)] font-bold text-violet-950">{value.title}</h3>
                <p className="text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-slate-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[84rem] px-[clamp(1rem,3vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-[clamp(0.9rem,1vw,1rem)] font-semibold uppercase tracking-[0.28em] text-rose-800">
            Who We Serve
          </span>
          <h2 className="mt-3 text-[clamp(2rem,3vw,3.6rem)] font-bold text-slate-950">Roles on Our Platform</h2>
          <p className="mx-auto mt-3 max-w-3xl text-[clamp(1.05rem,1.45vw,1.3rem)] text-slate-500">
            Our platform is built for four distinct groups, each with tailored access,
            tools, and responsibilities.
          </p>
        </div>
        <div className="grid auto-rows-fr gap-6 xl:grid-cols-2 xl:gap-8">
          {teamRoles.map((role) => (
            <div
              key={role.role}
              className="flex h-full flex-col gap-5 rounded-[1.5rem] bg-white p-[clamp(1.5rem,2vw,2.35rem)] transition-shadow duration-200 hover:shadow-md sm:flex-row sm:gap-6"
              style={{
                border: `1.5px solid ${role.bg}`,
                borderLeftColor: role.color,
                borderLeftWidth: "4px",
              }}
            >
              <div
                className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl px-3 text-[clamp(0.9rem,1vw,1rem)] font-bold uppercase"
                style={{ background: role.bg, color: role.color }}
              >
                {role.icon}
              </div>
              <div>
                <h3 className="mb-2 text-[clamp(1.45rem,2vw,2rem)] font-bold" style={{ color: role.color }}>
                  {role.role}
                </h3>
                <p className="mb-4 text-[clamp(1rem,1.25vw,1.15rem)] leading-relaxed text-slate-600">{role.description}</p>
                <ul className="space-y-2">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[clamp(0.98rem,1.1vw,1.05rem)] text-slate-700">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: role.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-[clamp(3rem,7vw,5rem)]" style={{ background: "linear-gradient(135deg, #2D1B4E, #6B2D3E)" }}>
        <div className="mx-auto max-w-6xl px-[clamp(1rem,3vw,2rem)] text-center">
          <h2 className="mb-4 text-[clamp(2rem,3vw,3.5rem)] font-bold text-white">Health Risks We Address</h2>
          <p className="mx-auto mb-8 max-w-4xl text-[clamp(1.05rem,1.45vw,1.3rem)] leading-relaxed text-rose-200">
            Domestic abuse causes severe physical and mental health consequences. Our
            platform connects survivors to medical resources, mental health professionals,
            and safe environments to begin healing.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Physical Injury",
              "PTSD and Trauma",
              "Anxiety and Depression",
              "Reproductive Health",
            ].map((label) => (
              <div key={label} className="rounded-xl bg-white/10 p-6">
                <p className="text-[clamp(1rem,1.2vw,1.15rem)] font-medium text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
