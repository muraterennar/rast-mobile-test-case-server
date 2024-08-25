const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SocialMediaSchema = new mongoose.Schema({
    SocialMediaLink: { type: String, required: true },
    SocialMediaName: { type: String, required: true },
    Description: { type: String },
});

// Mongoose Paginate eklentisini ekleyin
SocialMediaSchema.plugin(mongoosePaginate);

// Modeli tanımlayın
const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema);

// Metin dizinini oluşturun
SocialMedia.collection.createIndex({ SocialMediaName: 'text', Description: 'text' });

module.exports = SocialMedia;