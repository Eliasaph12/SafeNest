import React, { useState } from "react";

const logPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Victim",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example payload to send to backend
    const payload = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      ...(isLogin ? {} : { name: formData.name }),
    };

    console.log(isLogin ? "Login Data:" : "Register Data:", payload);

    // TODO: Connect with backend API (POST /login or /register)
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="Victim">Victim / Survivor</option>
          <option value="Counsellor">Counsellor</option>
          <option value="LegalAdvisor">Legal Advisor</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  form: {
    width: "350px",
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c7be5",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  toggleText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  toggleLink: {
    color: "#2c7be5",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default logPage;
