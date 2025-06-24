import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-heading">About MyNote</h1>
        <p className="about-description">
          MyNote is your personal space to record and organize your thoughts, ideas, and tasks. Designed with simplicity and elegance, it helps you stay productive and focused.
        </p>
        <div className="about-features">
          <h2>Key Features</h2>
          <ul>
            <li>✍️ Create, edit, and delete notes</li>
            <li>🔐 Secure access with login authentication</li>
            <li>💡 Organize using tags</li>
            <li>📱 Responsive design for all devices</li>
          </ul>
        </div>
        <div className="about-footer">
          <p>Crafted with 💖 by Sanskruti Soni</p>
        </div>
      </div>
    </div>
  );
};

export default About;
