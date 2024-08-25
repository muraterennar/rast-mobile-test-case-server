const mongoose = require('mongoose');

const socialMediaTypeSchema = new mongoose.Schema({
    SocialMediaTypeName: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('SocialMediaType', socialMediaTypeSchema);