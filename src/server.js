const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(bodyParser.json());
app.use(cors());

const Task = mongoose.model('Task', {
  taskname: String,
  description: String,
});

app.post('/api/tasks', async (req, res) => {
  const { taskname, description } = req.body;
  console.log('Received taskname:', taskname);
  console.log('Received description:', description);

  try {
    if (!taskname || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create a new task with the provided data
    const newTask = new Task({
      taskname,
      description,
    });

    await newTask.save();

    res.status(201).json({ message: 'Task created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
