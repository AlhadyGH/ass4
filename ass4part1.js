const express= requier('express');
const app= express();
const port= 3000;

app.use(express.json());

app.post('/user', (req, res) => {
    const data = req.body;

    const user = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    const exists= user.find(u=>u.email === data.email);
    if(exists){{
        return res.status(400).json({ message: 'User with this email already exists' });
    }
    user.push(data);
    fs.writeFileSync('users.json', JSON.stringify(user));

    res.status(201).json({ message: 'User added successfully', user: newUser });
});


app.listen(port, () => { 
  console.log(`Server is running on http://localhost:${port}`);
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.json());

app.patch("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, age, email } = req.body;


  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    let users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name !== undefined) users[userIndex].name = name;
    if (age !== undefined) users[userIndex].age = age;
    if (email !== undefined) users[userIndex].email = email;
    fs.writeFile("users.json", JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ message: "Error writing file" });
      }
      res.json({
        message: "User updated successfully",
        user: users[userIndex]
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/user/:id', (req, res) => {

  const userId = parseInt(req.params.id || req.body.id);

  const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

  const userIndex = data.findIndex(user => user.id === userId);


  if (userIndex === -1) {
    return res.status(404).json({ message: "User ID not found." });
  }
  data.splice(userIndex, 1);
  fs.writeFileSync('users.json', JSON.stringify(data, null, 2));

  res.json({ message: "User deleted successfully." });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/user/getByName', (req, res) => {

  const name = req.query.name;
  const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

  const user = data.find(u => u.name === name);
  if (!user) {
    return res.status(404).json({ message: "User name not found." });
  }

  res.json(user);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/user', (req, res) => {

  const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
  res.json(data);
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/user/filter', (req, res) => {
  const minAge = parseInt(req.query.minAge);

  const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

  const filtered = data.filter(user => user.age >= minAge);

  if (filtered.length === 0) {
    return res.status(404).json({ message: "no user found" });
  }

  res.json(filtered);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const data = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

  const user = data.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json(user);
});