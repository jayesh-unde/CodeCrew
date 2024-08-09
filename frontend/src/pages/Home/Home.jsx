import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Home Page!</h1>
      <p>This is a simple home page component styled with CSS Modules.</p>
    </div>
  );
};

export default Home;
