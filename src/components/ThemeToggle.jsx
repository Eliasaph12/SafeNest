import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  const options = [
    { value: "light", icon: "☀️", label: "Light" },
    { value: "dark", icon: "🌙", label: "Dark" },
  ];

  return (
    <div className="theme-toggle">
      {options.map((o) => (
        <button
          key={o.value}
          className={`theme-btn ${mode === o.value ? "active" : ""}`}
          onClick={() => setMode(o.value)}
          title={o.label}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
