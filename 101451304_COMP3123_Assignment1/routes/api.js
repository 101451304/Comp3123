const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Employee = require('../models/Employee');

const router = express.Router();

// User Signup
router.post('/user/signup', [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully.", user_id: newUser._id });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error" });
    }
});

// User Login
router.post('/user/login', [
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password').not().isEmpty().withMessage('Password is required')
], async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ status: false, message: "Invalid Username and password" });
    }

    const token = jwt.sign({ user_id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful.", jwt_token: token });
});

// Employee Management APIs
router.get('/emp/employees', async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json(employees);
});

// Create Employee
router.post('/emp/employees', [
    check('first_name').not().isEmpty().withMessage('First name is required'),
    check('last_name').not().isEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Enter a valid email'),
    check('position').not().isEmpty().withMessage('Position is required'),
    check('salary').isNumeric().withMessage('Salary must be a number'),
    check('date_of_joining').not().isEmpty().withMessage('Date of joining is required'),
    check('department').not().isEmpty().withMessage('Department is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
    }

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
});

// Get Employee by ID
router.get('/emp/employees/:eid', async (req, res) => {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
        return res.status(404).json({ status: false, message: "Employee not found" });
    }
    res.status(200).json(employee);
});

// Update Employee
router.put('/emp/employees/:eid', async (req, res) => {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
        return res.status(404).json({ status: false, message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee details updated successfully." });
});

// Delete Employee
router.delete('/emp/employees', async (req, res) => {
    const { eid } = req.query;
    const result = await Employee.findByIdAndDelete(eid);
    if (!result) {
        return res.status(404).json({ status: false, message: "Employee not found" });
    }
    res.status(204).json({ message: "Employee deleted successfully." });
});

module.exports = router;
