const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema (Authentication)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'faculty'], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, refPath: 'roleModel' },
  roleModel: { type: String, required: true, enum: ['AdminProfile', 'Student', 'Faculty'] }
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Admin Profile Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollmentNo: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Faculty Schema
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  subjects: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true }
});

// Notice Schema
const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAudience: { type: String, enum: ['all', 'student', 'faculty'], default: 'all' },
  publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  AdminProfile: mongoose.model('AdminProfile', adminSchema),
  Student: mongoose.model('Student', studentSchema),
  Faculty: mongoose.model('Faculty', facultySchema),
  Attendance: mongoose.model('Attendance', attendanceSchema),
  Notice: mongoose.model('Notice', noticeSchema)
};

// Department Schema
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  headOfDepartment: { type: String, required: true }
});

// Course Schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true }
});

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true, default: 100 },
  semester: { type: String, required: true }
});

// Timetable Schema
const timetableSchema = new mongoose.Schema({
  department: { type: String, required: true },
  course: { type: String, required: true },
  day: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: String, required: true },
  facultyName: { type: String, required: true }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  AdminProfile: mongoose.model('AdminProfile', adminSchema),
  Student: mongoose.model('Student', studentSchema),
  Faculty: mongoose.model('Faculty', facultySchema),
  Attendance: mongoose.model('Attendance', attendanceSchema),
  Notice: mongoose.model('Notice', noticeSchema),
  Department: mongoose.model('Department', departmentSchema),
  Course: mongoose.model('Course', courseSchema), // <-- The missing comma was here!
  Result: mongoose.model('Result', resultSchema),
  Timetable: mongoose.model('Timetable', timetableSchema)
};