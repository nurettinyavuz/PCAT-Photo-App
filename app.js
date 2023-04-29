const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/photo');

const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //obje olduğu için : kullandık // urlencoded url'deki data'yı okumayı sağlıyor
app.use(express.json()); //URL'de kullanıcının girdiği veriyi JSON formatına çeviriyor

//ROUTES
app.get('/', async(req, res) => {
  const photos=await Photo.find({});//Fotoğrafları yakaladık //asenkron kullanmamızın nedeni işlem bitene kadar beklememesi lazım daha hızlı çalışması için çünkü zaman alan bir işlem
  res.render('index',{
    photos
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add.ejs');
});
//photos dediğimiz kısım add sayfasında yönlendirdiğimiz için (action:"/photos")
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/'); //Kullanıcı mesajı gönderdikten sonra açılacak sayfayı gösterir
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi...`);
});

//package.json dosyasının içinde scriptin içine start ekliyoruz ve npm start dediğimiz nodemon kullanarak çalıştırıyor
//Nodemon amacı her değişiklikte otomatik olarak kaydediyor ve tekrardan başlatıyor bu da zamandan kazandırıyor
//request ile response arasında yapılır tüm işlemler (middleware)

// pcat-test-db

//db.photos.find().pretty() //verileri yazdırır
//db.photos.find() //Sadece fonksiyonu yazdırır