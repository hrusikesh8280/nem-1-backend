const express = require('express');
const Employee = require('../models/employee.Model');
const authMidlleware = require('../middleware/authMiddleware');
const employeeRouter = express.Router();


// Add new employee
employeeRouter.post('/employees',authMidlleware, async (req, res) => {
    
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    const employee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary,
    });
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all employees with pagination, sorting, and filtering
employeeRouter.get('/employees',authMidlleware, async (req, res) => {
    try {
      const { page = 1, limit = 5, department, sortBy = 'firstName' } = req.query;
      const filter = {};
      if (department) {
        filter.department = department;
      }
      const totalCount = await Employee.countDocuments(filter);

      const sortOptions = { [sortBy]: 1 };
      const employees = await Employee.find(filter)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      res.status(200).json({
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        employees,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


// Update employee
employeeRouter.put('/employees/:id',authMidlleware,authMidlleware, async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, department, salary },
      { new: true }
    );
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee
employeeRouter.delete('/employees/:id',authMidlleware, async (req, res) => {
  try {
    await Employee.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = employeeRouter;
