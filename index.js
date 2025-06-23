const express = require('express');
const multer = require('multer');
const rtfToHTML = require('./rtf-to-html/rtf-to-html'); // adjust path if needed

const app = express();
const upload = multer();

app.post('/convert', upload.single('file'), async (req, res) => {
  try {
    const html = rtfToHTML.fromString(req.file.buffer.toString('utf8'));
    res.json({ html });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`RTF→HTML API listening on port ${PORT}`));
