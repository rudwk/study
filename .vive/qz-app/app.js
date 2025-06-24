const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/api/questions', (req, res) => {
  const questions = JSON.parse(fs.readFileSync('questions.json'));
  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 
