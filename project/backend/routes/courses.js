import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all active courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.patch('/:courseId/progress', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { progress } = req.body;

    const user = await User.findById(userId);
    const regCourse = user.registeredCourses.find(rc => rc.courseId.toString() === req.params.courseId);

    if (!regCourse) {
      return res.status(404).json({ message: 'Course not found for user' });
    }

    regCourse.progress = progress;
    await user.save();

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Register for course
router.post('/:id/register', authMiddleware, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.userId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Already enrolled check
    if (course.enrolledStudents.some(id => id.toString() === userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add user to course
    course.enrolledStudents.push(userId);
    await course.save();

    // Add course to user's registered courses
    user.registeredCourses.push({
      courseId,
      registeredAt: new Date(),
      progress: 0, // Optional default
    });
    await user.save();

    res.json({ message: 'Successfully registered for course' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
