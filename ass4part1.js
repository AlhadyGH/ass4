const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/user', (req, res) => {
    const data = req.body;

    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    const exists = users.find(u => u.email === data.email);

    if (exists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    users.push(data);

    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User added successfully', user: data });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});