// pages/about.tsx

import Head from "next/head";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | MyApp</title>
        <meta name="description" content="Learn more about our company and mission." />
      </Head>

      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>About Us</h1>
        <p>
          Welcome to MyApp! We are a passionate team of developers and designers committed to building modern and
          efficient web applications.
        </p>

        <h2>Our Mission</h2>
        <p>To simplify digital experiences and empower businesses with cutting-edge web technologies.</p>

        <h2>What We Do</h2>
        <ul>
          <li>Build full-stack web applications</li>
          <li>Design clean and modern UIs</li>
          <li>Help companies go digital with scalable solutions</li>
        </ul>
      </main>
    </>
  );
};

export default About;
