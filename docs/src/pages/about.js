import React from 'react';
import Layout from '@theme/Layout';

function About() {
  return (
    <Layout title="About Project" description="Learn more about the project">
      <main>
        <div className="container">
          <h1>About Project</h1>
          <p>
            Welcome to the <strong>SIMPATIA</strong> project, developed by me, Jean Lucas Rothstein Machado, as part of the corporate track of <strong>INTELI</strong> in my 4th year of Computer Engineering. This project aims to identify and monitor the use of Personal Protective Equipment (PPE) in industrial environments, using computer vision techniques to ensure the safety and well-being of workers.
          </p>

          <section>
            <h2>The SIMPATIA Project</h2>
            <p>
              SIMPATIA is an innovative solution focused on detecting, in real-time, people who are not using PPE correctly in industrial areas. Using security cameras and computer vision algorithms, the system identifies and generates automatic alerts when a worker is not using the proper PPE, contributing to safety in the workplace.
            </p>
            <p>
              The project is being developed in partnership with <strong>Atvos</strong>, a company that produces ethanol and clean energy, focusing on the sugarcane industry. The collaboration between the academic project and the practical experience during the internship has been essential for the success of the initiative.
            </p>
          </section>

          <section>
            <h2>INTELI Methodology</h2>
            <p>
              The project is part of the development methodology of <strong>INTELI</strong>, an educational institution focused on preparing its students for the job market through corporate tracks in partnership with renowned companies. During the 4th-year corporate track, students develop real projects in collaboration with companies, creating innovative solutions while applying the knowledge they have gained throughout their studies.
            </p>
          </section>

          <section>
            <h2>The Team</h2>
            <p>
              I am a Computer Engineering student at <strong>INTELI</strong> and an intern at <strong>Atvos</strong>, where I am applying computer vision and artificial intelligence knowledge to create safety monitoring solution in the workplace.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default About;
