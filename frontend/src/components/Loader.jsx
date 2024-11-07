import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [loadingText, setLoadingText] = useState("Compiling code");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => prev === "Compiling code..." ? "Compiling code" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>{loadingText}</p>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #e0e0e0',
    borderTop: '6px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '10px',
  },
  loadingText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#555',
  },
};

// Adding keyframes for the spin animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Loader;
