
const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Radha", age: 20, course: "CSE" },
    { id: 2, name: "Anu", age: 21, course: "ECE" }
];

// GET - Retrieve all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET - Retrieve a student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// POST - Add a new student
app.post('/students', (req, res) => {
    const student = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };

    students.push(student);
    res.status(201).json(student);
});

// PUT - Replace student details
app.put('/students/:id', (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students[index] = {
        id: Number(req.params.id),
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };

    res.json(students[index]);
});

// PATCH - Update selected student details
app.patch('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, req.body);
    res.json(student);
});

// DELETE - Delete a student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
