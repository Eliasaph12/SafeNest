import { useState } from "react";

const contactTypes = [
  { label: "I need emergency help", icon: "Urgent", color: "#A32D2D", bg: "#FCEBEB" },
  { label: "Legal advice", icon: "Law", color: "#185FA5", bg: "#E6F1FB" },
  { label: "Counselling session", icon: "Care", color: "#0F6E56", bg: "#E1F5EE" },
  { label: "General enquiry", icon: "Talk", color: "#534AB7", bg: "#EEEDFE" },
];

const emergencyContacts = [
  { name: "Women Helpline", number: "181", desc: "24/7 free helpline for women in distress", icon: "181" },
  { name: "Police Emergency", number: "100", desc: "Immediate police assistance", icon: "100" },
  { name: "National DV Helpline", number: "1091", desc: "Domestic violence support and counselling", icon: "1091" },
  { name: "Childline", number: "1098", desc: "Support for children in danger", icon: "1098" },
];

export default function Contact({ onNavigate }) {
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
    anonymous: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <div
        className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:py-[72px]"
        style={{ background: "linear-gradient(135deg, #1A0A2E 0%, #4A1528 100%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(180,100,130,0.25) 0%, transparent 55%)",
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
            <div className="mb-4 inline-block rounded-full bg-white/12 px-5 py-2 text-[clamp(0.95rem,1.15vw,1.1rem)] text-rose-200">
              Contact and Support
            </div>
            <h1 className="mb-5 text-[clamp(2.85rem,5vw,5.8rem)] font-bold leading-[0.95] text-white">
              You are not alone.
              <span className="text-rose-300"> We are here to help.</span>
            </h1>
            <p className="mx-auto max-w-[58rem] text-[clamp(1.12rem,1.8vw,1.45rem)] text-white/75">
              Reach out to our team of legal advisors, counsellors, and support staff
              confidentially and safely.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#2D1B4E] px-4 py-6">
        <div className="mx-auto max-w-[84rem]">
          <p className="mb-5 text-center text-[clamp(0.95rem,1.05vw,1rem)] font-semibold uppercase tracking-[0.26em] text-rose-300">
            Emergency Helplines Available 24/7
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="rounded-[1.25rem] p-[clamp(1.25rem,1.8vw,1.75rem)] text-center transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", textDecoration: "none" }}
              >
                <div className="mb-2 text-[clamp(1.05rem,1.2vw,1.15rem)] font-bold text-white">{contact.icon}</div>
                <p className="text-[clamp(1.9rem,2.8vw,2.8rem)] font-bold leading-none text-white">{contact.number}</p>
                <p className="mt-2 text-[clamp(0.98rem,1.05vw,1rem)] font-semibold text-rose-300">{contact.name}</p>
                <p className="mt-2 text-[clamp(0.95rem,1vw,1rem)] text-white/50">{contact.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[84rem] px-[clamp(1rem,3vw,2rem)] py-[clamp(3rem,7vw,5rem)]">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(23rem,0.92fr)] xl:gap-10">
          <div className="max-w-[44rem] xl:justify-self-end">
            <h2 className="mb-3 text-[clamp(2rem,3vw,3.6rem)] font-bold text-[#1A0A2E]">Send Us a Message</h2>
            <p className="mb-7 text-[clamp(1rem,1.25vw,1.15rem)] text-slate-500">
              All messages are confidential. You may choose to remain anonymous.
            </p>

            <div className="mb-7 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
              {contactTypes.map((type, index) => (
                <button
                  key={type.label}
                  type="button"
                  onClick={() => setSelectedType(index)}
                  className="flex min-h-[120px] flex-col justify-center rounded-[1.25rem] border-2 p-[clamp(1.25rem,1.8vw,1.6rem)] text-left transition-all duration-200 sm:min-h-[140px]"
                  style={{
                    background: selectedType === index ? type.bg : "white",
                    borderColor: selectedType === index ? type.color : "#F0E6EA",
                  }}
                >
                  <span className="text-[clamp(0.95rem,1vw,1rem)] font-bold uppercase" style={{ color: type.color }}>
                    {type.icon}
                  </span>
                  <p className="mt-2 text-[clamp(1.05rem,1.25vw,1.15rem)] font-semibold leading-snug" style={{ color: selectedType === index ? type.color : "#6B7280" }}>
                    {type.label}
                  </p>
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="rounded-[1.5rem] border-2 border-[#0F6E56] bg-[#E1F5EE] p-[clamp(1.5rem,2vw,2.25rem)] text-center">
                <div className="mb-3 text-[clamp(2rem,2.4vw,2.5rem)] font-bold text-[#0F6E56]">Sent</div>
                <h3 className="mb-2 text-[clamp(1.45rem,2vw,2rem)] font-bold text-[#0F6E56]">Message Received</h3>
                <p className="text-[clamp(1rem,1.15vw,1.1rem)] text-slate-600">
                  A member of our team will get back to you within 24 hours. If this is an
                  emergency, please call 181 immediately.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      role: "",
                      message: "",
                      anonymous: false,
                    });
                    setSelectedType(null);
                  }}
                  className="mt-5 rounded-full px-7 py-3 text-[clamp(1rem,1.1vw,1.05rem)] font-semibold text-white"
                  style={{ background: "#0F6E56" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="flex cursor-pointer items-start gap-2 sm:items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={form.anonymous}
                    onChange={handleChange}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: "#72243E" }}
                  />
                  <span className="text-[clamp(1rem,1.15vw,1.08rem)] text-slate-600">
                    Submit anonymously, name and email are not required
                  </span>
                </label>

                {!form.anonymous && (
                  <>
                    <div>
                      <label className="mb-2 block text-[clamp(0.92rem,1vw,0.98rem)] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-[1rem] border px-5 py-4 text-[clamp(1rem,1.12vw,1.05rem)] focus:outline-none"
                        style={{ borderColor: "#E5DAE0", background: "white" }}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[clamp(0.92rem,1vw,0.98rem)] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full rounded-[1rem] border px-5 py-4 text-[clamp(1rem,1.12vw,1.05rem)] focus:outline-none"
                        style={{ borderColor: "#E5DAE0", background: "white" }}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="mb-2 block text-[clamp(0.92rem,1vw,0.98rem)] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    I am a
                  </label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full rounded-[1rem] border px-5 py-4 text-[clamp(1rem,1.12vw,1.05rem)] focus:outline-none"
                    style={{ borderColor: "#E5DAE0", background: "white" }}
                  >
                    <option value="">Select your role</option>
                    <option value="survivor">Victim / Survivor</option>
                    <option value="family">Family member / Friend</option>
                    <option value="counsellor">Counsellor</option>
                    <option value="legal">Legal Advisor</option>
                    <option value="volunteer">Volunteer / NGO</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[clamp(0.92rem,1vw,0.98rem)] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe how we can help you. You are safe here."
                    className="w-full resize-none rounded-[1rem] border px-5 py-4 text-[clamp(1rem,1.12vw,1.05rem)] focus:outline-none"
                    style={{ borderColor: "#E5DAE0", background: "white" }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-[1rem] py-4 text-[clamp(1.05rem,1.2vw,1.15rem)] font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #2D1B4E, #6B2D3E)" }}
                >
                  Send Message Securely
                </button>

                <p className="text-center text-[clamp(0.92rem,1vw,0.98rem)] text-slate-400">
                  Your message is encrypted. We never share your data.
                </p>
              </form>
            )}
          </div>

          <div className="space-y-6 xl:max-w-[33rem] xl:justify-self-start">
            <div className="rounded-[1.5rem] border border-[#F0E6EA] bg-white p-[clamp(1.5rem,2vw,2rem)]">
              <h3 className="mb-5 text-[clamp(1.55rem,2vw,2.1rem)] font-bold text-[#1A0A2E]">Connect With Us</h3>
              <div className="space-y-4">
                {[
                  { label: "Email Support", value: "support@safeharbor.org" },
                  { label: "Live Chat", value: "Available Mon-Sat, 9am-7pm" },
                  { label: "Head Office", value: "12 Dignity Road, New Delhi - 110001" },
                  { label: "Response Time", value: "Within 24 hours for non-emergency cases" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[clamp(0.95rem,1vw,1rem)] font-medium text-slate-400">{item.label}</p>
                    <p className="text-[clamp(1.05rem,1.2vw,1.15rem)] font-semibold text-[#2D1B4E]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#F0E6EA] bg-white p-[clamp(1.5rem,2vw,2rem)]">
              <h3 className="mb-5 text-[clamp(1.55rem,2vw,2.1rem)] font-bold text-[#1A0A2E]">Partner Organizations</h3>
              <div className="space-y-3">
                {[
                  { name: "iCall - TISS", type: "Mental Health", color: "#0F6E56" },
                  { name: "Majlis Legal Centre", type: "Legal Aid", color: "#185FA5" },
                  { name: "Snehi Foundation", type: "Crisis Support", color: "#72243E" },
                  { name: "Sakhi - Women's Aid Organisation", type: "Shelter and Support", color: "#534AB7" },
                ].map((org) => (
                  <div key={org.name} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="text-[clamp(1rem,1.15vw,1.1rem)] font-semibold text-slate-700">{org.name}</p>
                    <span
                      className="w-fit rounded-full px-3 py-1 text-[clamp(0.92rem,1vw,0.98rem)] font-medium"
                      style={{ background: "#FDF8F5", color: org.color, border: `1px solid ${org.color}` }}
                    >
                      {org.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border-[1.5px] border-[#F4C0D1] bg-[#FBEAF0] p-[clamp(1.35rem,1.8vw,1.6rem)]">
              <p className="mb-2 text-[clamp(1.15rem,1.35vw,1.3rem)] font-bold text-[#72243E]">Quick Safety Tip</p>
              <p className="text-[clamp(0.98rem,1.08vw,1.05rem)] leading-relaxed text-slate-600">
                If you are being monitored, use a private or incognito browser window and
                clear your history after. Use the Quick Exit button to leave the page
                instantly if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
