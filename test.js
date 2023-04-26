const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

// create schema (Şablon)
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('photo', PhotoSchema);

// create a Photo
//photos.push() yöntemi, her bir belgeyi temsil eden nesneleri photos adlı diziye ekler.
/* 
const photos = [];
for (let i = 0; i < 5; i++) {
  photos.push({
    title: `Photo Title ${i}`,
    description: `Photo description ${i} Lorem İpsum`,
  });
}

Photo.create(photos)
.then((createdPhoto) => {
  console.log('Created Photo:', createdPhoto);
}).catch((error) => {
  console.error('Error creating photo:', error);
});
*/
Photo.create({
  title: 'Photo Title 1',
  description: 'Photo description 1 Lorem ipsum',
})
  .then((createdPhoto) => {
    console.log('created photo:', createdPhoto);
  })
  .catch((error) => {
    console.log(error);
  });

/* 
//Read a photo
Photo.find({})
.then(data => console.log(data));
*/

/* 
//Update Photo
const id = '6448cddf23cfc03dcda97008';
Photo.findByIdAndUpdate(id, {
  title: 'Photo Title 1 Updated',
  description: 'Photo description 1 updated',
})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
*/

/* 
//Delete a Photo
const id="6448cddf23cfc03dcda97008";
Photo.findByIdAndDelete(id)
  .then(() => {
    console.log('Photo is removed ...');
  })
  .catch((error) => {
    console.log('Error deleting photo:', error);
  });
*/

