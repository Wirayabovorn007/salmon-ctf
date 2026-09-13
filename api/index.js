const express = require('express');
const path = require('path');

const app = express();

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('/salmon', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'salmon.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'admin.html'));
});

app.get('/secret', (req, res) => {
   res.sendFile(path.join(PUBLIC_DIR, 'secret.html'));
});

app.get('/style.css', (req, res) => {
  res.type('text/css');
  res.sendFile(path.join(PUBLIC_DIR, 'style.css'));
});

// Anything else is a 404 - no hints, no alternate paths to the flag.
app.use((req, res) => {
  res
    .status(404)
    .type('html')
    .send(
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
        '<title>404 Not Found</title></head>' +
        '<body style="font-family: sans-serif; text-align:center; padding-top: 4rem; background:#0a1930; color:#bee9e8;">' +
        '<h1>404</h1><p>Not Found</p></body></html>'
    );
});


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`North Pacific Marine Research Station running at http://localhost:${PORT}`);
  });
}

module.exports = app;
