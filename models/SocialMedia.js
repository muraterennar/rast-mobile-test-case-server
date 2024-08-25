const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const socialMediaSchema = new mongoose.Schema({
    SocialMediaLink: { type: String, required: true },
    SocialMediaName: { type: String, required: true },
    Description: { type: String },
}, {
    timestamps: true,
});

socialMediaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SocialMedia', socialMediaSchema);
