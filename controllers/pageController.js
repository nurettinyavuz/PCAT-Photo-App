const fs = require('fs');
const Photo =require('../models/Photo.js');
//Bu photoyu tanımlarken Controllers içinde iki farklı dosyada tanımladığımızda sıkıntı olmuyor ama app.js'de tanımlı olursa sıkıntı olurdu hata verirdi kod

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add.ejs');
};

exports.getEditPage = async (req, res) => {
  // Edit sayfasını açtık
  const photo = await Photo.findByIdAndUpdate({ _id: req.params.id }); //Burada fotoğrafıın ID'sini yakalıyoruz
  res.render('edit', {
    photo,
  });
};
