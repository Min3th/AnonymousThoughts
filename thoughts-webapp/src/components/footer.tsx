import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div style={{ textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <p>
          <a href="/about" style={linkStyle}>
            About
          </a>{" "}
          |{" "}
          <a href="/contact" style={linkStyle}>
            Contact
          </a>{" "}
          |{" "}
          <a href="https://github.com/myapp" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#f1f1f1",
  borderTop: "1px solid #ddd",
  marginTop: "auto",
};

const linkStyle: React.CSSProperties = {
  color: "#0070f3",
  textDecoration: "none",
  margin: "0 0.5rem",
};

export default Footer;
