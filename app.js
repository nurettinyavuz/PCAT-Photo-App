const express = require('express');
const app = express();

const path = require('path');
/* 
const myLogger =(req,res,next)=>{
  console.log("Middleware Log 1");
  next();
  //Bir sonraki middleware'a gidebilmek için next kullandık 
  //Yani kullanıcıya request gönderiyoruz ama response yarım kalıyor 
  //o yüzden next kullanıyoruz yarım kalmaması için   
}
*/

//Middlewares
//Static dosyaları public dosyasının içine attık
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});
//__dirname değişkeni, uygulamanın bulunduğu dizinin tam yolunu verir.

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi...`);
});

//package.json dosyasının içinde scriptin içine start ekliyoruz ve npm start dediğimiz nodemon kullanarak çalıştırıyor
//Nodemon amacı her değişiklikte otomatik olarak kaydediyor ve tekrardan başlatıyor bu da zamandan kazandırıyor
//request ile response arasında yapılır tüm işlemler (middleware)
