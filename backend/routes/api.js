const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// ADDED "Result" TO THIS LIST SO THE APP DOESN'T CRASH:
const { User, AdminProfile, Student, Faculty, Attendance, Notice, Department, Course, Result } = require('../models/Models');
const { protect } = require('../middleware/auth');
const router = express.Router();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// --- AUTH & SEED ---
router.post('/seed-admin', async (req, res) => {
  try {
    // 1. Force delete any corrupted existing admin data
    await User.deleteMany({ role: 'admin' });
    await AdminProfile.deleteMany({});
    
    // 2. Create a fresh profile and user
    const adminProfile = await AdminProfile.create({ name: 'Super Admin' });
    await User.create({
      email: 'admin@college.edu',
      password: 'adminpassword123',
      role: 'admin',
      referenceId: adminProfile._id,
      roleModel: 'AdminProfile'
    });
    
    res.status(201).json({ message: 'Clean Admin seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('referenceId');
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        token: generateToken(user._id, user.role),
        role: user.role,
        profile: user.referenceId
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN ROUTES ---
router.get('/admin/stats', protect(['admin']), async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const faculty = await Faculty.countDocuments();
    const notices = await Notice.countDocuments();
    res.json({ students, faculty, notices, courses: 15, departments: 5 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Student Management
router.post('/admin/students', protect(['admin']), async (req, res) => {
  try {
    const { email, password, name, enrollmentNo, department, course } = req.body;
    const student = await Student.create({ name, enrollmentNo, department, course });
    await User.create({ email, password, role: 'student', referenceId: student._id, roleModel: 'Student' });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ADDED TRY/CATCH TO THIS ROUTE FOR SAFETY:
router.get('/admin/students', protect(['admin', 'faculty']), async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// --- DEPARTMENT ROUTES ---
router.get('/admin/departments', protect(['admin']), async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/admin/departments', protect(['admin']), async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- COURSE ROUTES ---
router.get('/admin/courses', protect(['admin']), async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/admin/courses', protect(['admin']), async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Faculty Management
router.post('/admin/faculty', protect(['admin']), async (req, res) => {
  try {
    const { email, password, name, employeeId, department, subjects } = req.body;
    const faculty = await Faculty.create({ name, employeeId, department, subjects: subjects.split(',') });
    await User.create({ email, password, role: 'faculty', referenceId: faculty._id, roleModel: 'Faculty' });
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/admin/faculty', protect(['admin']), async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notices
router.get('/notices', protect(['admin', 'student', 'faculty']), async (req, res) => {
  try {
    const notices = await Notice.find().sort('-createdAt');
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/notices', protect(['admin', 'faculty']), async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- FACULTY ROUTES (ATTENDANCE) ---
router.post('/faculty/attendance', protect(['faculty']), async (req, res) => {
  try {
    const { studentId, subject, date, status, facultyId } = req.body;
    const record = await Attendance.create({ student: studentId, faculty: facultyId, subject, date, status });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- STUDENT ROUTES ---
router.get('/student/attendance/:id', protect(['student']), async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.params.id }).populate('faculty', 'name');
    res.json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// --- MANAGE MARKS (RESULTS) API ROUTES ---
// ==========================================

// 1. Get all published results (Used by Faculty to view the table)
router.get('/faculty/results', protect(['faculty', 'admin']), async (req, res) => {
  try {
    // populate() fetches the actual student name and enrollment number using the ObjectId
    const results = await Result.find().populate('student', 'name enrollmentNo');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Publish a new result
router.post('/faculty/results', protect(['faculty', 'admin']), async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Update an existing result (Used by the "Edit" button)
router.put('/faculty/results/:id', protect(['faculty', 'admin']), async (req, res) => {
  try {
    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Ensures the database returns the updated document
    );
    if (!updatedResult) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json({ message: 'Marks updated successfully', updatedResult });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;