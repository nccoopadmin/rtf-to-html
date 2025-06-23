const express = require('express');
const multer = require('multer');
const rtfToHTML = require('@iarna/rtf-to-html');

const app = express();
const upload = multer();

app.post('/convert', upload.single('file'), (req, res) => {
  const rtf = req.file.buffer.toString('utf8');
  rtfToHTML.fromString(rtf, (err, html) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ html });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`RTF to HTML API running on port ${PORT}`);
});
