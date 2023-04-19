const express = require('express');
const ejs = require('ejs');
const path = require('path');


const app = express();

//Template Engine
app.set ("view engine","ejs");

app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
 res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
 });
 app.get('/add', (req, res) => {
  res.render('add.ejs');
 });

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi...`);
});

//package.json dosyasının içinde scriptin içine start ekliyoruz ve npm start dediğimiz nodemon kullanarak çalıştırıyor
//Nodemon amacı her değişiklikte otomatik olarak kaydediyor ve tekrardan başlatıyor bu da zamandan kazandırıyor
//request ile response arasında yapılır tüm işlemler (middleware)
