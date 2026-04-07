import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

const themes = {
  home: {
    particles: [
      { emoji: "🛡️", size: 28 }, { emoji: "🌐", size: 24 }, { emoji: "🔐", size: 22 },
      { emoji: "⚡", size: 20 }, { emoji: "🛰️", size: 26 }, { emoji: "💡", size: 18 },
      { emoji: "🔭", size: 30 }, { emoji: "🌍", size: 24 }, { emoji: "⚙️", size: 22 },
      { emoji: "🛡️", size: 20 }, { emoji: "💫", size: 16 }, { emoji: "🌐", size: 28 },
    ],
    light: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f0f9ff 100%)",
    dark:  "linear-gradient(135deg, #0a0e1a 0%, #0d1224 50%, #080d1a 100%)",
  },
  login: {
    particles: [
      { emoji: "🔐", size: 24 }, { emoji: "🛡️", size: 28 }, { emoji: "🔑", size: 22 },
      { emoji: "💫", size: 18 }, { emoji: "🧬", size: 26 }, { emoji: "⚡", size: 20 },
      { emoji: "🌐", size: 24 }, { emoji: "💡", size: 16 }, { emoji: "🔐", size: 22 },
    ],
    light: "linear-gradient(135deg, #ede9ff 0%, #ddd6fe 50%, #c4b5fd 100%)",
    dark:  "linear-gradient(135deg, #0d0b1e 0%, #130f2e 50%, #0a0818 100%)",
  },
  register: {
    particles: [
      { emoji: "🌱", size: 24 }, { emoji: "🛡️", size: 28 }, { emoji: "🌐", size: 22 },
      { emoji: "💫", size: 18 }, { emoji: "⚡", size: 26 }, { emoji: "🔭", size: 20 },
      { emoji: "🧬", size: 24 }, { emoji: "💡", size: 16 }, { emoji: "🌱", size: 22 },
    ],
    light: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
    dark:  "linear-gradient(135deg, #071a0e 0%, #0a2414 50%, #051208 100%)",
  },
  dashboard_Victim: {
    particles: [
      { emoji: "🛡️", size: 24 }, { emoji: "🕊️", size: 22 }, { emoji: "🌐", size: 20 },
      { emoji: "💫", size: 16 }, { emoji: "⚡", size: 24 }, { emoji: "🔐", size: 18 },
      { emoji: "🌍", size: 22 }, { emoji: "💡", size: 14 }, { emoji: "🛡️", size: 26 },
    ],
    light: "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #ffe4e6 100%)",
    dark:  "linear-gradient(135deg, #1a0a1e 0%, #200d24 50%, #180810 100%)",
  },
  dashboard_Counsellor: {
    particles: [
      { emoji: "🧠", size: 24 }, { emoji: "💡", size: 22 }, { emoji: "🌐", size: 20 },
      { emoji: "💫", size: 16 }, { emoji: "⚡", size: 22 }, { emoji: "🔭", size: 18 },
      { emoji: "🧬", size: 24 }, { emoji: "🛡️", size: 14 }, { emoji: "🧠", size: 26 },
    ],
    light: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #d1fae5 100%)",
    dark:  "linear-gradient(135deg, #071a0e 0%, #0b2416 50%, #051410 100%)",
  },
  dashboard_LegalAdvisor: {
    particles: [
      { emoji: "⚖️", size: 24 }, { emoji: "🏛️", size: 22 }, { emoji: "🔍", size: 20 },
      { emoji: "💫", size: 16 }, { emoji: "📡", size: 22 }, { emoji: "🛡️", size: 18 },
      { emoji: "⚡", size: 24 }, { emoji: "🌐", size: 14 }, { emoji: "⚖️", size: 26 },
    ],
    light: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
    dark:  "linear-gradient(135deg, #070d1a 0%, #0a1224 50%, #05091a 100%)",
  },
  dashboard_Admin: {
    particles: [
      { emoji: "🔐", size: 24 }, { emoji: "⚙️", size: 22 }, { emoji: "📡", size: 20 },
      { emoji: "💫", size: 16 }, { emoji: "🛰️", size: 22 }, { emoji: "🔭", size: 18 },
      { emoji: "⚡", size: 24 }, { emoji: "🌐", size: 14 }, { emoji: "🔐", size: 26 },
    ],
    light: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 50%, #ddd6fe 100%)",
    dark:  "linear-gradient(135deg, #0d0b1e 0%, #150f2e 50%, #0a0820 100%)",
  },
};

const LiveBackground = ({ page, userRole }) => {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const themeKey = page === "dashboard" ? `dashboard_${userRole}` : page;
  const theme = themes[themeKey] || themes.home;
  const gradient = isDark ? theme.dark : theme.light;

  // dark mode: brighter opacity so particles glow on dark bg
  const baseOpacity = isDark ? 0.45 : 0.25;
  const opacityRange = isDark ? 0.3 : 0.25;
  const pulseRange = isDark ? 0.12 : 0.08;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = theme.particles.map((p) => ({
      ...p,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: baseOpacity + Math.random() * opacityRange,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // dark mode: draw subtle radial glow overlay
      if (isDark) {
        const grd = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.7
        );
        grd.addColorStop(0, "rgba(129,140,248,0.04)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        const floatY = Math.sin(time * 0.001 + p.phase) * 6;
        ctx.save();
        ctx.globalAlpha = p.opacity + Math.sin(time * 0.002 + p.phase) * pulseRange;

        // dark mode: add glow shadow behind particles
        if (isDark) {
          ctx.shadowColor = "rgba(129,140,248,0.6)";
          ctx.shadowBlur = 12;
        }

        ctx.font = `${p.size * 1.5}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(p.emoji, p.x, p.y + floatY);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [themeKey, isDark]);

  return (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: -2,
        background: gradient,
        transition: "background 0.8s ease",
      }} />
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0, zIndex: -1,
        pointerEvents: "none",
      }} />
    </>
  );
};

export default LiveBackground;
