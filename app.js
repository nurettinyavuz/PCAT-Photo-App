const express = require('express');
const ejs = require('ejs');
const path = require('path');


const app = express();

//Template Engine
app.set ("view engine","ejs");

app.use(express.static('public'));
app.use(express.urlencoded({extended:true})) //obje olduğu için : kullandık // urlencoded url'deki data'yı okumayı sağlıyor
app.use(express.json());//URL'de kullanıcının girdiği veriyi JSON formatına çeviriyor
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
//photos dediğimiz kısım add sayfasında yönlendirdiğimiz için (action:"/photos")
 app.post('/photos', (req, res) => {
  console.log(req.body);
  res.redirect('/')
 });

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi...`);
});

//package.json dosyasının içinde scriptin içine start ekliyoruz ve npm start dediğimiz nodemon kullanarak çalıştırıyor
//Nodemon amacı her değişiklikte otomatik olarak kaydediyor ve tekrardan başlatıyor bu da zamandan kazandırıyor
//request ile response arasında yapılır tüm işlemler (middleware)
