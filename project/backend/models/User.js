import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const grades = ['A', 'B', 'C'];
const getRandomGrade = () => grades[Math.floor(Math.random() * grades.length)];
const getRandomAttendance = () => Math.floor(Math.random() * 21 + 80); // 80–100%

const userSchema = new mongoose.Schema({

  averageGrade: {
    type: String,
    default: getRandomGrade
  },
  attendancePercentage: {
    type: Number,
    default: getRandomAttendance
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student'],
    default: 'student'
  },
  registeredCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    }
  }],
  grades: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    grade: String,
    marks: Number,
    totalMarks: Number,
    assignmentName: String,
    gradedAt: Date
   
  }],
  attendance: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    date: Date,
    present: Boolean,
    topic: String
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);