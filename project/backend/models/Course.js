import mongoose from 'mongoose';

const syllabusSchema = new mongoose.Schema({
  week: Number,
  topic: String,
  content: String
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  totalMarks: Number
}, { _id: false });

const announcementSchema = new mongoose.Schema({
  title: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  },
  important: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  syllabus: [syllabusSchema],
  assignments: [assignmentSchema],
  announcements: [announcementSchema],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', courseSchema);
