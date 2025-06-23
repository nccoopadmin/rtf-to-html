const express = require('express');
const multer = require('multer');
const rtfToHTML = require('rtf-to-html'); // ✅ using the NPM package

const app = express();
const upload = multer();

app.post('/convert', upload.single('file'), (req, res) => {
  try {
    const rtf = req.file.buffer.toString('utf8');
    const html = rtfToHTML.fromString(rtf); // uses the library
    res.json({ html });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`RTF to HTML API running on port ${PORT}`);
});
