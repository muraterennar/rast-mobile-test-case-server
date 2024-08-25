const express = require('express');
const { body, validationResult } = require('express-validator');
const SocialMediaType = require('../models/SocialMediaType');
const router = express.Router();


// Tüm sosyal medya türlerini getir
router.get('/api/getall', async (req, res) => {
    try {
        const socialMediaTypes = await SocialMediaType.find();
        res.json(socialMediaTypes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Belirli bir sosyal medya türünü getir - ID ile
router.get('api/id/:id', async (req, res) => {
    try {
        const socialMediaType = await SocialMediaType.findById(req.params.id);
        if (!socialMediaType) return res.status(404).json({ message: 'Sosyal medya türü bulunamadı' });
        res.json(socialMediaType);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Belirli bir sosyal medya türünü getir - Adı ile
router.get('api/name/:name', async (req, res) => {
    try {
        const socialMediaType = await SocialMediaType.findOne({ SocialMediaTypeName: req.params.name });
        if (!socialMediaType) return res.status(404).json({ message: 'Sosyal medya türü bulunamadı' });
        res.json(socialMediaType);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Yeni bir sosyal medya türü oluştur
router.post('/api/add',
    body('SocialMediaTypeName').isString().notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Veriyi kaydetme
        try {
            const socialMediaType = new SocialMediaType({
                SocialMediaTypeName: req.body.SocialMediaTypeName
            });
            const savedSocialMediaType = await socialMediaType.save();
            console.log('Kaydedilen Sosyal Medya Türü:', savedSocialMediaType);
            res.status(200).json(savedSocialMediaType);
        } catch (err) {
            res.status(400).json({ message: err.message });
            console.error('Veri Kaydetme Hatası:', err);
        }
    }
);

// Belirli bir sosyal medya türünü güncelle
router.patch('/api/update/:id',
    body('SocialMediaTypeName').isString().notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const socialMediaType = await SocialMediaType.findById(req.params.id);
            if (!socialMediaType) return res.status(404).json({ message: 'Sosyal medya türü bulunamadı' });

            socialMediaType.SocialMediaTypeName = req.body.SocialMediaTypeName;

            const savedSocialMediaType = await socialMediaType.save();
            console.log('Güncellenen Sosyal Medya Türü:', savedSocialMediaType);
            res.json(savedSocialMediaType);
        } catch (err) {
            res.status(400).json({ message: err.message });
            console.error('Veri Güncelleme Hatası:', err);
        }
    }
);

// Belirli bir sosyal medya türünü sil
router.delete('/api/delete/:id', async (req, res) => {

    try {
        const result = await SocialMediaType.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: 'Sosyal medya türü bulunamadı' });

        res.json({ message: 'Sosyal medya türü silindi. - ' + result.deletedCount.toString() });

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }



    try {
        const socialMediaType = await SocialMediaType.findById(req.params.id);
        if (!socialMediaType) return res.status(404).json({ message: 'Sosyal medya türü bulunamadı' });

        await socialMediaType.remove();
        res.json({ message: 'Sosyal medya türü silindi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;