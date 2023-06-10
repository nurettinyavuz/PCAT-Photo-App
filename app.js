const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');
const path = require('path');
const photoController=require("./controllers/photoControllers"); //PhotoControllers modülünü çağırdık
const pageController=require("./controllers/pageController"); //pageController modülünü çağırdık


const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//MIDDLEWARES (Mıddlewares'ları Kaydetmek zorundayız)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //obje olduğu için : kullandık // urlencoded url'deki data'yı okumayı sağlıyor
app.use(express.json()); //URL'de kullanıcının girdiği veriyi JSON formatına çeviriyor
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'], //Hangi methodların Override edilmesi gerektiğini belirtmemiz gerekiyor,böylece request gönderebiliyoruz
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);//PhotoControllers sayfasından veriyi yukarıda çekip photoController içine atmıştık şimdide fonksiyonu çağırdık
app.get('/photos/:id',photoController.getPhoto);
app.post('/photos', photoController.createPhoto);//photos dediğimiz kısım add.ejs sayfasında yönlendirdiğimiz için (action:"/photos" yazdığımız yer)
app.put('/photos/:id',photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about',pageController.getAboutPage );
app.get('/add',pageController.getAddPage);
app.get('/photos/edit/:id',pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi...`);
});


//request ile response arasında yapılır tüm işlemler (middleware)

// pcat-test-db

