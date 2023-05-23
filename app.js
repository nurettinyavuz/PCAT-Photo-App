const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/photo');

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

//ROUTES
app.get('/', async (req, res) => {
  //.sort('-dateCreated') bu kısım yeni ekleneni başa yazar ana sayfada
  const photos = await Photo.find({}).sort('-dateCreated'); //Fotoğrafları yakaladık //asenkron kullanmamızın nedeni işlem bitene kadar beklememesi lazım daha hızlı çalışması için çünkü zaman alan bir işlem
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  // Id'yi kullanarak fotoğrafları birbirinden ayırdık
  const photo = await Photo.findById(req.params.id); //photo.ejs sayfasında <%= photo.title %> burada yazan photo kısmı const photo olarak tanımladığımız için
  res.render('photo', {
    //photo yazan kısım photo.ejs sayfasını temsil eder
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add.ejs');
});

//photos dediğimiz kısım add.ejs sayfasında yönlendirdiğimiz için (action:"/photos" yazdığımız yer)
app.post('/photos', async (req, res) => {
  const uploadDir = 'Public/uploads';
  //Klasörün olup olmadığını kontrol ediyoruz eğer klasör yoksa klasör oluşturacak varsa aşağıdan devam edecek
  if (!fs.existsSync(uploadDir)) {
    //Public/uploads klasörünün zaten var olup olmadığı kontrol edilir. (! işareti de )
    fs.mkdirSync(uploadDir); //Klasör yoksa, fs.mkdirSync yöntemi kullanılarak bu klasör oluşturulur
  }

  let uploadeImage = req.files.image;//image yazmamızın nedeni yüklediğimiz kısmın name'nin image olması (add.ejs'de)
  let uploadPath = __dirname + '/Public/uploads/' + uploadeImage.name; //Yüklenen fotoğraflar Public klasöründe uploads dosyası oluşturur ve içine yüklenir, uploadeImage.name ise dosyanın adı oluşturulur
  //uploads'ın sağına  / işareti koymazsak dosya yolunu bulamaz
  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name, //görselin yolunu bildirdik ,sonradan veritabına kaydetmek için
    });
    res.redirect('/');
  });
});


app.get('/photos/edit/:id', (req, res) => {
  res.render('edit');
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
