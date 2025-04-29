const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 80;

// Gelen verileri saklamak için hafıza objeleri
let data = {
  heat: null,
  moisture: null,
  smoke: null
};

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // index.html için
// POST endpoint: Arduino bu adrese veri yollar
app.post('/data', (req, res) => {
  const { heat, moisture, smoke } = req.body;

  if (heat !== undefined) data.heat = heat;
  if (moisture !== undefined) data.moisture = moisture;
  if (smoke !== undefined) data.smoke = smoke;

  console.log("Veri alındı:", data);
  res.status(200).json({ message: 'Veri başarıyla alındı.' });
});

// GET endpointleri
app.get('/heat', (req, res) => {
  res.json({ heat: data.heat });
});

app.get('/moisture', (req, res) => {
  res.json({ moisture: data.moisture });
});

app.get('/smokes', (req, res) => {
  res.json({ smoke: data.smoke });
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`API http://localhost:${port} adresinde çalışıyor`);
});
