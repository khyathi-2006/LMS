import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

console.log('Connecting to:', process.env.MONGODB_URI);

const sampleCourses = [
    {
      title: "Introduction to React",
      description: "Learn the fundamentals of React including components, state, and props. Build modern web applications with this powerful JavaScript library.",
      instructor: "Dr. Sarah Johnson",
      duration: "8 weeks",
      level: "Beginner",
      price: 99,
      image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/embed/s2skans2dP4?si=cugKFT4WlyHb0D5w",
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
      ],
      isActive: true
    },
    {
      title: "Advanced Node.js",
      description: "Master advanced Node.js concepts including performance tuning, clustering, and asynchronous patterns.",
      instructor: "Prof. David Lee",
      duration: "6 weeks",
      level: "Advanced",
      price: 149,
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/embed/MuwJJrfIfsU?si=WxJh9PM2jPkV4w5q",
      category: "Backend Development",
      syllabus: [
        { week: 1, topic: "Node.js Internals", content: "Event loop, call stack, libuv" },
        { week: 2, topic: "Asynchronous Patterns", content: "Callbacks, Promises, async/await" },
        { week: 3, topic: "Clustering & Child Processes", content: "Scaling Node apps with multi-core CPUs" }
      ],
      assignments: [
        { title: "Multithreaded Logger", description: "Create a logging system using Node clusters", dueDate: new Date('2024-02-28'), totalMarks: 120 }
      ],
      announcements: [
        { title: "Kickoff Session", message: "First live class starts Monday 10AM", important: true }
      ],
      isActive: true
    },
    {
      title: "Python for Data Science",
      description: "Learn Python programming for data analysis, visualization, and machine learning using popular libraries like Pandas, NumPy, and Matplotlib.",
      instructor: "Dr. Emily Chen",
      duration: "10 weeks",
      level: "Intermediate",
      price: 129,
      image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/embed/mkv5mxYu0Wk?si=Borce7r6GJvvxtsT",
      category: "Data Science",
      syllabus: [
        { week: 1, topic: "Python Basics Review", content: "Data types, loops, functions" },
        { week: 2, topic: "NumPy Fundamentals", content: "Arrays, operations, broadcasting" },
        { week: 3, topic: "Pandas DataFrames", content: "Data manipulation, cleaning, aggregation" },
        { week: 4, topic: "Data Visualization", content: "Matplotlib and Seaborn" },
        { week: 5, topic: "Introduction to Machine Learning", content: "Scikit-learn basics" }
      ],
      assignments: [
        { title: "Data Cleaning Project", description: "Clean and analyze a messy dataset", dueDate: new Date('2024-03-10'), totalMarks: 100 },
        { title: "Exploratory Data Analysis", description: "Perform EDA on a given dataset", dueDate: new Date('2024-03-25'), totalMarks: 150 },
        { title: "ML Model Implementation", description: "Build a simple predictive model", dueDate: new Date('2024-04-15'), totalMarks: 200 }
      ],
      announcements: [
        { title: "Course Materials Available", message: "All course materials are now available in the learning portal", important: true },
        { title: "Office Hours", message: "Weekly office hours every Thursday 2-4 PM", important: false }
      ],
      isActive: true
    },
    {
      title: "UX/UI Design Fundamentals",
      description: "Master the principles of user experience and interface design. Learn wireframing, prototyping, and user testing techniques for modern digital products.",
      instructor: "Alex Rivera",
      duration: "6 weeks",
      level: "Beginner",
      price: 89,
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU?si=uwepywfaOfKCfeGc",
      category: "Design",
      syllabus: [
        { week: 1, topic: "Introduction to UX/UI", content: "Core principles, user-centered design" },
        { week: 2, topic: "Wireframing & User Flows", content: "Tools: Figma, Adobe XD" },
        { week: 3, topic: "Visual Design Basics", content: "Color theory, typography, spacing" },
        { week: 4, topic: "Prototyping", content: "Interactive prototypes, usability testing" }
      ],
      assignments: [
        { title: "App Redesign", description: "Improve an existing app's UI/UX", dueDate: new Date('2024-03-05'), totalMarks: 100 },
        { title: "Portfolio Project", description: "Design a responsive website mockup", dueDate: new Date('2024-03-20'), totalMarks: 150 }
      ],
      announcements: [
        { title: "Welcome!", message: "Join our Slack channel #ux-ui-2024 for collaboration", important: true },
        { title: "Figma Workshop", message: "Optional live Figma tutorial this Friday", important: false }
      ],
      isActive: true
    },
    {
      title: "Full Stack Web Development",
      description: "Build dynamic, responsive full-stack web applications using HTML, CSS, JavaScript, Node.js, Express, MongoDB, and React.",
      instructor: "John Doe",
      duration: "12 weeks",
      level: "Intermediate",
      price: 199,
      image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/embed/8KaJRw-rfn8?si=USZpLflBELYGwH0i",
      category: "Web Development",
      syllabus: [
        { week: 1, topic: "HTML & CSS Basics", content: "Structure, layout, and styling" },
        { week: 2, topic: "JavaScript Fundamentals", content: "ES6, DOM manipulation, functions" },
        { week: 3, topic: "Backend with Node.js", content: "Express.js, routing, middleware" },
        { week: 4, topic: "MongoDB Integration", content: "CRUD operations, Mongoose" },
        { week: 5, topic: "Frontend with React", content: "Components, props, hooks" },
        { week: 6, topic: "Final Project", content: "Build a full stack application" }
      ],
      assignments: [
        { title: "Mini Portfolio Website", description: "Create a personal portfolio site", dueDate: new Date('2024-04-05'), totalMarks: 120 },
        { title: "Full Stack Blog App", description: "Develop a blog platform using MERN stack", dueDate: new Date('2024-04-25'), totalMarks: 200 }
      ],
      announcements: [
        { title: "Project Kickoff", message: "Your final project has been announced. Start early!", important: true },
        { title: "Tech Talk Session", message: "Join live Q&A with industry experts next week", important: false }
      ],
      isActive: true
    },
    {
      title: "Cybersecurity Essentials",
      description: "Understand the fundamentals of cybersecurity including threat modeling, network security, cryptography, and ethical hacking practices.",
      instructor: "Dr. Rachel Singh",
      duration: "8 weeks",
      level: "Advanced",
      price: 159,
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/embed/vK4Mno4QYqk?si=yXtlrttKZNEVnupC",
      category: "Security",
      syllabus: [
        { week: 1, topic: "Introduction to Cybersecurity", content: "Threat landscape, CIA triad" },
        { week: 2, topic: "Network Security", content: "Firewalls, VPNs, intrusion detection" },
        { week: 3, topic: "Cryptography", content: "Symmetric & asymmetric encryption" },
        { week: 4, topic: "Ethical Hacking", content: "Reconnaissance, vulnerability scanning" }
      ],
      assignments: [
        { title: "Network Analysis Report", description: "Analyze a network for potential threats", dueDate: new Date('2024-04-08'), totalMarks: 100 },
        { title: "Encryption Tool", description: "Build a basic file encryption tool", dueDate: new Date('2024-04-22'), totalMarks: 150 }
      ],
      announcements: [
        { title: "Cyber Week", message: "Special guest lecture on zero-day exploits", important: true },
        { title: "Assignment 1 Help", message: "Office hours extended for cybersecurity queries", important: false }
      ],
      isActive: true
    }
  ];
  

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Course.deleteMany({});
    await Course.insertMany(sampleCourses);
    
    console.log('✅ Sample courses inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding courses:', err);
    process.exit(1);
  }
};

seed();
