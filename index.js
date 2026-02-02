import express from 'express';

const app = express();
const PORT = 3000;




app.get('/', (req, res) => {
  res.send('<h1> Backend Project - Day 1!</h1>');
});






// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});