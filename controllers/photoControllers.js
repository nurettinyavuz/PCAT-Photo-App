const Photo =require('../models/Photo.js');
const fs = require('fs');
//Bu photoyu tanımlarken Controllers içinde iki farklı dosyada tanımladığımızda sıkıntı olmuyor ama app.js'de tanımlı olursa sıkıntı olurdu hata verirdi kod


exports.getAllPhotos = async (req, res) => {
  //.sort('-dateCreated') bu kısım yeni ekleneni başa yazar ana sayfada (- eklemesydik en son ekleneni en sona yazardı)
  const photos = await Photo.find({}).sort('-dateCreated'); //Fotoğrafları yakaladık //asenkron kullanmamızın nedeni işlem bitene kadar beklememesi lazım daha hızlı çalışması için çünkü zaman alan bir işlem
  res.render('index', {
    photos,
  });
};

exports.getPhoto = async (req, res) => {
  // Id'yi kullanarak fotoğrafları birbirinden ayırdık
  const photo = await Photo.findById(req.params.id); //photo.ejs sayfasında <%= photo.title %> burada yazan photo kısmı const photo olarak tanımladığımız için (Tek bir fotoyu çekiyoruz)
  res.render('photo', {
    //photo yazan kısım photo.ejs sayfasını temsil eder
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'Public/uploads';
  //Klasörün olup olmadığını kontrol ediyoruz eğer klasör yoksa klasör oluşturacak varsa aşağıdan devam edecek
  if (!fs.existsSync(uploadDir)) {
    //Public/uploads klasörünün zaten var olup olmadığı kontrol edilir. (! işareti de )
    fs.mkdirSync(uploadDir); //Klasör yoksa, fs.mkdirSync yöntemi kullanılarak bu klasör oluşturulur
  }

  let uploadeImage = req.files.image; //image yazmamızın nedeni yüklediğimiz kısmın name'nin image olması (add.ejs'de)
  let uploadPath = __dirname + '//../Public/uploads/' + uploadeImage.name; //Yüklenen fotoğraflar Public klasöründe uploads dosyası oluşturur ve içine yüklenir, uploadeImage.name ise dosyanın adı oluşturulur
  //uploads'ın sağına  / işareti koymazsak dosya yolunu bulamaz
  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name, //görselin yolunu bildirdik ,sonradan veritabına kaydetmek için
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findByIdAndUpdate({ _id: req.params.id }); //Burada fotoğrafıın ID'sini yakalıyoruz
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`); //Update edildikten sonra yine o sayfaya gitmesini istedik
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id }); //Photo modelini bulur
  let deletedImage = __dirname + '/../public' + photo.image; //silinecek fotoğrafın dosya yolunu oluşturur
  fs.unlinkSync(deletedImage); //üst satırda dosyanın yolunu deletedImage'e fotoğrafın yolunu atadık sonra o yolu senkron olarak sildik senkron olarak silmemizin nedeni silmeden aşağı satıra geçmesini istemiyoruz
  await Photo.findByIdAndRemove(req.params.id); // MongoDB veritabanında "Photo" modelini kullanarak fotoğrafın kaydını siler.
  res.redirect('/');
};
