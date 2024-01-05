const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/api/:dateString', (req, res) => {
  const dateString = req.params.dateString;
  let date;

  if (/^\d+$/.test(dateString)) {
    // If the parameter is a Unix timestamp
    date = new Date(parseInt(dateString));
  } else {
    // If the parameter is a natural language date
    date = new Date(dateString);
  }

  if (!isNaN(date.getTime())) {
    // If the date is valid
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    // If the date is invalid
    res.json({ error: 'Invalid date' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});