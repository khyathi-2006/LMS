import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get student dashboard data
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('registeredCourses.courseId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const registeredCourses = [];
    let totalProgress = 0;

    for (const regCourse of user.registeredCourses) {
      const course = await Course.findById(regCourse.courseId);
      if (course) {
        const progress = regCourse.progress || Math.floor(Math.random() * 51 + 50); 
        totalProgress += progress;

        registeredCourses.push({
          ...course.toObject(),
          progress,
          registeredAt: regCourse.registeredAt
        });
      }
    }

    const averageProgress =
      registeredCourses.length > 0
        ? Math.floor(totalProgress / registeredCourses.length)
        : 0;

    // 🔁 Fake values for now
    const averageGrade = ['A', 'B', 'C'][Math.floor(Math.random() * 3)];
    const attendancePercentage = Math.floor(Math.random() * 21 + 80); // 80–100%

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      registeredCourses,
      grades: user.grades,
      attendance: user.attendance,
      totalCourses: user.registeredCourses.length,
      overallProgress: averageProgress,
      averageGrade,
      attendancePercentage
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get announcements for student's courses
router.get('/announcements', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    const courseIds = user.registeredCourses.map(course => course.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });
    
    let announcements = [];
    courses.forEach(course => {
      course.announcements.forEach(announcement => {
        announcements.push({
          ...announcement.toObject(),
          courseName: course.title
        });
      });
    });
    
    // Sort by date (newest first)
    announcements.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;