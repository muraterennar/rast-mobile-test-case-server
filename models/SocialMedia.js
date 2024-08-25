const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Sosyal medya bilgilerini saklamak için bir Mongoose şeması oluşturun
const SocialMediaSchema = new mongoose.Schema({
    SocialMediaLink: { type: String, required: true },
    SocialMediaName: { type: String, required: true },
    Description: { type: String },
});

// Mongoose Paginate eklentisini şemaya ekleyin
// Bu, veri kümesinde sayfalama (pagination) işlemlerini kolaylaştırır
SocialMediaSchema.plugin(mongoosePaginate);

// SocialMedia adında bir model tanımlayın
// Bu model, SocialMediaSchema şemasını kullanır ve MongoDB koleksiyonuyla etkileşim kurmak için kullanılır
const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema);

// Metin dizinini (text index) oluşturun
// Bu dizin, SocialMediaName ve Description alanlarında metin bazlı arama yapmayı sağlar
SocialMedia.collection.createIndex({ SocialMediaName: 'text', Description: 'text' });

// Modeli dışa aktarın
// Bu, SocialMedia modelini diğer dosyalarda kullanılabilir hale getirir
module.exports = SocialMedia;