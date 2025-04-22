import React from 'react';

const MainContent = () => {
  return (
    <main className="main-content">
      <section id="home" className="section">
        <h1>Website for training, I use it as a portfolio</h1>
        <img
          src="https://steamuserimages-a.akamaihd.net/ugc/1843658378002555999/D2CB1C4A0B5A01521A8B19C8939A2694D7E3F105/?imw=512&amp;imh=341&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
          alt="Placeholder"
          className="about-image"
        />
      </section>

      <section id="about" className="section about">
        <h2>About Us</h2>
        <p>In the course of my development as a web developer, I have focused on learning key technologies that enable us to create modern, scalable, and efficient applications. One significant step in this process was the study of virtual private servers (VPS). Setting up servers, managing operating systems like Ubuntu and CentOS, and creating an environment for application deployment have become integral parts of my experience. Through this process, I gained a deeper understanding of server infrastructure and learned how to deploy projects, work with tools like Docker and Nginx, and ensure fault tolerance and security for my applications.</p>
        <p>In the field of frontend development, I have focused on mastering React, one of the most widely used libraries for building user interfaces. During my learning process, I have gained a solid understanding of the component-based approach and how to work with the state using useState and Redux. Additionally, I have learned how to interact with APIs using Axios and Fetch.</p>
        <p>Implementing dynamic interfaces and routing with React Router has become an essential skill for me, as has optimizing application performance. Through my projects, I have used React to build responsive and user-friendly UIs, which has helped me better understand the fundamentals of modern web development.</p>
        <p>To work on the server side, I studied Express.js, a lightweight and flexible framework for Node.js. With its help, I learned how to create a RESTful API, process queries, organize routing, and work with databases such as MongoDB or PostgreSQL. Developing server logic, user authentication using JWT, and integrating with external services were important parts of my training.</p>
        <p>In addition, I studied a variety of technologies such as Node.js, Webpack, Git, CI/CD, and other tools to automate the process of building, testing, and deploying applications. This allowed me to create fully-fledged projects from idea to production, where every step - from writing code to deployment on the server - was done in accordance with modern development standards.</p>
      </section>

      <section id="contact" className="section about">
        <h2>Contact</h2>
        <p>Email: ggrrtt87@gmail.com</p>
        <p>Email: serbul11@mail.ru</p>
        <p>Phone: +7 (900)-900-90-90</p>
      </section>
    </main>
  );
};

export default MainContent;