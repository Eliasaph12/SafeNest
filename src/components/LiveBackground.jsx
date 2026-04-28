import { useTheme } from "./ThemeContext";

const pageThemes = {
  home: {
    light: {
      base: "linear-gradient(180deg, #f7faff 0%, #eef5ff 42%, #f7fbff 100%)",
      surface: "rgba(255, 255, 255, 0.72)",
      accent: "rgba(108, 99, 255, 0.18)",
      accentSoft: "rgba(56, 189, 248, 0.16)",
      glow: "rgba(251, 191, 36, 0.08)",
      beam: "rgba(108, 99, 255, 0.14)",
      line: "rgba(148, 163, 184, 0.14)",
      ring: "rgba(108, 99, 255, 0.18)",
      vignette: "rgba(255, 255, 255, 0.34)",
    },
    dark: {
      base: "linear-gradient(180deg, #08101f 0%, #0d1730 42%, #10192a 100%)",
      surface: "rgba(15, 23, 42, 0.54)",
      accent: "rgba(129, 140, 248, 0.26)",
      accentSoft: "rgba(56, 189, 248, 0.2)",
      glow: "rgba(244, 114, 182, 0.1)",
      beam: "rgba(129, 140, 248, 0.16)",
      line: "rgba(148, 163, 184, 0.08)",
      ring: "rgba(129, 140, 248, 0.18)",
      vignette: "rgba(2, 6, 23, 0.42)",
    },
  },
  login: {
    light: {
      base: "linear-gradient(180deg, #f8f7ff 0%, #f2f2ff 48%, #f4f8ff 100%)",
      surface: "rgba(255, 255, 255, 0.76)",
      accent: "rgba(108, 99, 255, 0.18)",
      accentSoft: "rgba(96, 165, 250, 0.14)",
      glow: "rgba(167, 139, 250, 0.12)",
      beam: "rgba(108, 99, 255, 0.16)",
      line: "rgba(148, 163, 184, 0.12)",
      ring: "rgba(108, 99, 255, 0.16)",
      vignette: "rgba(255, 255, 255, 0.32)",
    },
    dark: {
      base: "linear-gradient(180deg, #0a1124 0%, #111938 48%, #111827 100%)",
      surface: "rgba(15, 23, 42, 0.56)",
      accent: "rgba(129, 140, 248, 0.28)",
      accentSoft: "rgba(96, 165, 250, 0.18)",
      glow: "rgba(192, 132, 252, 0.1)",
      beam: "rgba(129, 140, 248, 0.18)",
      line: "rgba(148, 163, 184, 0.08)",
      ring: "rgba(129, 140, 248, 0.18)",
      vignette: "rgba(2, 6, 23, 0.44)",
    },
  },
  register: {
    light: {
      base: "linear-gradient(180deg, #f6fcfb 0%, #effbf6 48%, #f4f8ff 100%)",
      surface: "rgba(255, 255, 255, 0.76)",
      accent: "rgba(16, 185, 129, 0.16)",
      accentSoft: "rgba(45, 212, 191, 0.16)",
      glow: "rgba(56, 189, 248, 0.08)",
      beam: "rgba(16, 185, 129, 0.14)",
      line: "rgba(148, 163, 184, 0.12)",
      ring: "rgba(16, 185, 129, 0.16)",
      vignette: "rgba(255, 255, 255, 0.3)",
    },
    dark: {
      base: "linear-gradient(180deg, #071816 0%, #0c211f 48%, #0f1b2c 100%)",
      surface: "rgba(15, 23, 42, 0.54)",
      accent: "rgba(16, 185, 129, 0.22)",
      accentSoft: "rgba(45, 212, 191, 0.16)",
      glow: "rgba(56, 189, 248, 0.08)",
      beam: "rgba(16, 185, 129, 0.14)",
      line: "rgba(148, 163, 184, 0.08)",
      ring: "rgba(16, 185, 129, 0.18)",
      vignette: "rgba(2, 6, 23, 0.44)",
    },
  },
  dashboard_Victim: {
    light: {
      base: "linear-gradient(180deg, #fff9fb 0%, #fff6f8 44%, #f7f9ff 100%)",
      surface: "rgba(255, 255, 255, 0.76)",
      accent: "rgba(244, 114, 182, 0.14)",
      accentSoft: "rgba(108, 99, 255, 0.12)",
      glow: "rgba(251, 113, 133, 0.08)",
      beam: "rgba(244, 114, 182, 0.12)",
      line: "rgba(148, 163, 184, 0.12)",
      ring: "rgba(244, 114, 182, 0.16)",
      vignette: "rgba(255, 255, 255, 0.3)",
    },
    dark: {
      base: "linear-gradient(180deg, #1a1021 0%, #231226 44%, #10192d 100%)",
      surface: "rgba(15, 23, 42, 0.54)",
      accent: "rgba(244, 114, 182, 0.18)",
      accentSoft: "rgba(129, 140, 248, 0.14)",
      glow: "rgba(251, 113, 133, 0.08)",
      beam: "rgba(244, 114, 182, 0.14)",
      line: "rgba(148, 163, 184, 0.08)",
      ring: "rgba(244, 114, 182, 0.16)",
      vignette: "rgba(2, 6, 23, 0.46)",
    },
  },
  dashboard_Counsellor: {
    light: {
      base: "linear-gradient(180deg, #f7fffc 0%, #eefcf8 44%, #f4fbff 100%)",
      surface: "rgba(255, 255, 255, 0.76)",
      accent: "rgba(45, 212, 191, 0.14)",
      accentSoft: "rgba(56, 189, 248, 0.12)",
      glow: "rgba(74, 222, 128, 0.08)",
      beam: "rgba(45, 212, 191, 0.12)",
      line: "rgba(148, 163, 184, 0.12)",
      ring: "rgba(45, 212, 191, 0.16)",
      vignette: "rgba(255, 255, 255, 0.3)",
    },
    dark: {
      base: "linear-gradient(180deg, #081916 0%, #0b2222 44%, #0e1d29 100%)",
      surface: "rgba(15, 23, 42, 0.54)",
      accent: "rgba(45, 212, 191, 0.16)",
      accentSoft: "rgba(56, 189, 248, 0.14)",
      glow: "rgba(74, 222, 128, 0.08)",
      beam: "rgba(45, 212, 191, 0.14)",
      line: "rgba(148, 163, 184, 0.08)",
      ring: "rgba(45, 212, 191, 0.18)",
      vignette: "rgba(2, 6, 23, 0.44)",
    },
  },
  dashboard_LegalAdvisor: {
    light: {
      base: "linear-gradient(180deg, #f7fbff 0%, #eef6ff 44%, #f5f8ff 100%)",
      surface: "rgba(255, 255, 255, 0.76)",
      accent: "rgba(96, 165, 250, 0.16)",
      accentSoft: "rgba(108, 99, 255, 0.1)",
      glow: "rgba(59, 130, 246, 0.08)",
      beam: "rgba(96, 165, 250, 0.14)",
      line: "rgba(148, 163, 184, 0.12)",
      ring: "rgba(96, 165, 250, 0.16)",
      vignette: "rgba(255, 255, 255, 0.3)",
    },
    dark: {
      base: "linear-gradient(180deg, #08121f 0%, #0d1830 44%, #10192b 100%)",
      surface: "rgba(15, 23, 42, 0.54)",
      accent: "rgba(96, 165, 250, 0.18)",
      accentSoft: "rgba(129, 140, 248, 0.12)",
      glow: "rgba(59, 130, 246, 0.08)",
      beam: "rgba(96, 165, 250, 0.14)",
      line: "rgba(148, 163, 184, 0.08)",
      ring: "rgba(96, 165, 250, 0.18)",
      vignette: "rgba(2, 6, 23, 0.46)",
    },
  },
  dashboard_Admin: {
    light: {
      base: "linear-gradient(180deg, #fbf9ff 0%, #f6f1ff 44%, #f4f8ff 100%)",
      surface: "rgba(255, 255, 255, 0.76)",
      accent: "rgba(167, 139, 250, 0.16)",
      accentSoft: "rgba(96, 165, 250, 0.1)",
      glow: "rgba(129, 140, 248, 0.08)",
      beam: "rgba(167, 139, 250, 0.14)",
      line: "rgba(148, 163, 184, 0.12)",
      ring: "rgba(167, 139, 250, 0.16)",
      vignette: "rgba(255, 255, 255, 0.3)",
    },
    dark: {
      base: "linear-gradient(180deg, #120d24 0%, #191433 44%, #10192b 100%)",
      surface: "rgba(15, 23, 42, 0.54)",
      accent: "rgba(167, 139, 250, 0.2)",
      accentSoft: "rgba(96, 165, 250, 0.1)",
      glow: "rgba(129, 140, 248, 0.08)",
      beam: "rgba(167, 139, 250, 0.16)",
      line: "rgba(148, 163, 184, 0.08)",
      ring: "rgba(167, 139, 250, 0.18)",
      vignette: "rgba(2, 6, 23, 0.46)",
    },
  },
};

const LiveBackground = ({ page, userRole }) => {
  const { isDark } = useTheme();
  const themeKey = page === "dashboard" ? `dashboard_${userRole}` : page;
  const theme = pageThemes[themeKey] || pageThemes.home;
  const palette = isDark ? theme.dark : theme.light;

  return (
    <div
      aria-hidden="true"
      className="live-bg"
      style={{
        "--live-base": palette.base,
        "--live-surface": palette.surface,
        "--live-accent": palette.accent,
        "--live-accent-soft": palette.accentSoft,
        "--live-glow": palette.glow,
        "--live-beam": palette.beam,
        "--live-line": palette.line,
        "--live-ring": palette.ring,
        "--live-vignette": palette.vignette,
      }}
    >
      <div className="live-bg-grid" />
      <div className="live-bg-noise" />
      <div className="live-bg-spotlight" />
      <div className="live-bg-beam beam-left" />
      <div className="live-bg-beam beam-right" />
      <div className="live-bg-orb orb-primary" />
      <div className="live-bg-orb orb-secondary" />
      <div className="live-bg-orb orb-tertiary" />
      <div className="live-bg-ring ring-left" />
      <div className="live-bg-ring ring-right" />
      <div className="live-bg-sheen" />
      <div className="live-bg-vignette" />
    </div>
  );
};

export default LiveBackground;
