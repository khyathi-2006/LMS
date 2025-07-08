import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import User from '../models/User.js';

dotenv.config();

const sampleCourses = [
  {
    title: "Introduction to React",
    description: "Learn the fundamentals of React including components, state, and props. Build modern web applications with this powerful JavaScript library.",
    instructor: "Dr. Sarah Johnson",
    duration: "8 weeks",
    level: "Beginner",
    price: 99,
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
    category: "Web Development",
    syllabus: [
      { week: 1, topic: "Introduction to React", content: "Setting up development environment, JSX basics" },
      { week: 2, topic: "Components and Props", content: "Creating reusable components, passing data" },
      { week: 3, topic: "State and Events", content: "Managing component state, handling user interactions" },
      { week: 4, topic: "Hooks", content: "useState, useEffect, custom hooks" }
    ],
    assignments: [
      { title: "Todo App", description: "Build a todo application using React hooks", dueDate: new Date('2024-02-15'), totalMarks: 100 },
      { title: "Weather App", description: "Create a weather application with API integration", dueDate: new Date('2024-03-01'), totalMarks: 150 }
    ],
    announcements: [
      { title: "Welcome to React Course", message: "Welcome everyone! Please make sure to join our Discord server for discussions.", important: true },
      { title: "Assignment 1 Released", message: "Your first assignment is now available. Due date: Feb 15th", important: false }
    ]
  },
  {
    title: "Node.js Backend Development",
    description: "Master server-side JavaScript with Node.js. Learn to build RESTful APIs, work with databases, and deploy applications.",
    instructor: "Prof. Michael Chen",
    duration: "10 weeks",
    level: "Intermediate",
    price: 149,
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
    category: "Backend Development",
    syllabus: [
      { week: 1, topic: "Node.js Fundamentals", content: "Understanding Node.js runtime, modules, and npm" },
      { week: 2, topic: "Express.js Framework", content: "Building web servers with Express" },
      { week: 3, topic: "Database Integration", content: "Working with MongoDB and Mongoose" },
      { week: 4, topic: "Authentication", content: "JWT tokens and user authentication" }
    ],
    assignments: [
      { title: "REST API", description: "Build a complete REST API with authentication", dueDate: new Date('2024-02-20'), totalMarks: 120 },
      { title: "Database Design", description: "Design and implement a complex database schema", dueDate: new Date('2024-03-05'), totalMarks: 80 }
    ],
    announcements: [
      { title: "Course Materials Updated", message: "New resources have been added to the course materials section.", important: false },
      { title: "Live Session Tomorrow", message: "Don't forget about our live coding session tomorrow at 3 PM EST", important: true }
    ]
  },
  {
    title: "Python Data Science",
    description: "Dive into data science with Python. Learn pandas, numpy, matplotlib, and machine learning basics to analyze and visualize data.",
    instructor: "Dr. Emily Rodriguez",
    duration: "12 weeks",
    level: "Intermediate",
    price: 199,
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    category: "Data Science",
    syllabus: [
      { week: 1, topic: "Python Basics for Data Science", content: "Python fundamentals, data structures" },
      { week: 2, topic: "NumPy and Pandas", content: "Data manipulation and analysis" },
      { week: 3, topic: "Data Visualization", content: "Matplotlib, Seaborn, and Plotly" },
      { week: 4, topic: "Machine Learning Basics", content: "Scikit-learn introduction" }
    ],
    assignments: [
      { title: "Data Analysis Project", description: "Analyze a real-world dataset and create visualizations", dueDate: new Date('2024-02-25'), totalMarks: 150 },
      { title: "ML Model", description: "Build and evaluate a machine learning model", dueDate: new Date('2024-03-10'), totalMarks: 200 }
    ],
    announcements: [
      { title: "Dataset Available", message: "The dataset for your final project is now available for download.", important: true },
      { title: "Office Hours", message: "I'll be available for office hours every Tuesday and Thursday 2-4 PM.", important: false }
    ]
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design. Create beautiful and functional designs using modern design tools.",
    instructor: "Alex Thompson",
    duration: "6 weeks",
    level: "Beginner",
    price: 89,
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU",
    category: "Design",
    syllabus: [
      { week: 1, topic: "Design Principles", content: "Color theory, typography, layout" },
      { week: 2, topic: "User Research", content: "Understanding user needs and behavior" },
      { week: 3, topic: "Wireframing", content: "Creating wireframes and prototypes" },
      { week: 4, topic: "Design Tools", content: "Figma, Adobe XD, Sketch" }
    ],
    assignments: [
      { title: "Mobile App Design", description: "Design a complete mobile app interface", dueDate: new Date('2024-02-18'), totalMarks: 100 },
      { title: "User Research Report", description: "Conduct user research and present findings", dueDate: new Date('2024-03-03'), totalMarks: 75 }
    ],
    announcements: [
      { title: "Design Challenge", message: "Join our weekly design challenge to practice your skills!", important: false },
      { title: "Guest Speaker", message: "We have a special guest speaker from Google next week.", important: true }
    ]
  },
  {
    title: "Digital Marketing Strategy",
    description: "Master digital marketing techniques including SEO, social media marketing, content marketing, and analytics to grow your business online.",
    instructor: "Lisa Parker",
    duration: "8 weeks",
    level: "Beginner",
    price: 119,
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM",
    category: "Marketing",
    syllabus: [
      { week: 1, topic: "Digital Marketing Overview", content: "Introduction to digital marketing channels" },
      { week: 2, topic: "SEO Fundamentals", content: "Search engine optimization basics" },
      { week: 3, topic: "Social Media Marketing", content: "Facebook, Instagram, LinkedIn strategies" },
      { week: 4, topic: "Content Marketing", content: "Creating engaging content" }
    ],
    assignments: [
      { title: "SEO Audit", description: "Perform SEO audit on a website", dueDate: new Date('2024-02-22'), totalMarks: 90 },
      { title: "Marketing Campaign", description: "Design and present a complete marketing campaign", dueDate: new Date('2024-03-08'), totalMarks: 130 }
    ],
    announcements: [
      { title: "Industry Trends", message: "Check out the latest digital marketing trends in our resources section.", important: false },
      { title: "Final Project Guidelines", message: "Final project guidelines have been posted. Please review them carefully.", important: true }
    ]
  },
  {
    title: "Cybersecurity Essentials",
    description: "Learn fundamental cybersecurity concepts including network security, cryptography, and ethical hacking to protect digital assets.",
    instructor: "Commander James Wilson",
    duration: "10 weeks",
    level: "Advanced",
    price: 249,
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://www.youtube.com/embed/hxRKGKgMmtA",
    category: "Cybersecurity",
    syllabus: [
      { week: 1, topic: "Security Fundamentals", content: "CIA triad, threat landscape" },
      { week: 2, topic: "Network Security", content: "Firewalls, IDS/IPS, VPNs" },
      { week: 3, topic: "Cryptography", content: "Encryption, hashing, digital signatures" },
      { week: 4, topic: "Ethical Hacking", content: "Penetration testing basics" }
    ],
    assignments: [
      { title: "Security Assessment", description: "Perform a security assessment on a test network", dueDate: new Date('2024-02-28'), totalMarks: 180 },
      { title: "Incident Response Plan", description: "Create a comprehensive incident response plan", dueDate: new Date('2024-03-12'), totalMarks: 120 }
    ],
    announcements: [
      { title: "Lab Environment Ready", message: "The virtual lab environment is now ready for hands-on practice.", important: true },
      { title: "Security News", message: "Stay updated with the latest security news and vulnerabilities.", important: false }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Course.deleteMany({});
    console.log('Cleared existing courses');
    
    // Insert sample courses
    await Course.insertMany(sampleCourses);
    console.log('Sample courses inserted successfully');
    
    mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();