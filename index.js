const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/api/", (req, res) => {
    var resDate = new Date();
    res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
  });

app.get("/api/:date_string", (req, res) => {
    let dateString = req.params.date_string;
  
    if (/\d{5,}/.test(dateString)) {
      let dateInt = parseInt(dateString);
      //Date regards numbers as unix timestamps, strings are processed differently
      res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
    } else {
      let dateObject = new Date(dateString);
  
      if (dateObject.toString() === "Invalid Date") {
        res.json({ "error": "Invalid Date" });
      } else {
        res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
      }
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});