const express = require('express');
const { body, validationResult } = require('express-validator');
const SocialMedia = require('../models/SocialMedia');
const router = express.Router();

// Yeni bir sosyal medya bağlantısı oluştur
router.post('/api/add',
  body('SocialMediaLink').isURL().notEmpty(),
  body('SocialMediaName').isString().notEmpty(),
  async (req, res) => {
    // Verileri doğrulama
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Veriyi kaydetme
    try {
      const socialMedia = new SocialMedia({
        SocialMediaLink: req.body.SocialMediaLink,
        SocialMediaName: req.body.SocialMediaName,
        Description: req.body.Description,
      });
      const savedSocialMedia = await socialMedia.save();
      console.log('Kaydedilen Sosyal Medya:', savedSocialMedia); // Log ekleyin
      res.status(200).json(savedSocialMedia);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.error('Veri Kaydetme Hatası:', err); // Hata logu
    }
  }
);

// Tüm sosyal medya bağlantılarını getir (Sayfalama ile)
router.get('/api/getall', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const socialMedias = await SocialMedia.paginate({}, { page, limit });
    res.json(socialMedias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/api/get/:id', async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findById(req.params.id);
    if (!socialMedia) return res.status(404).json({ message: 'Sosyal medya bağlantısı bulunamadı' });
    res.json(socialMedia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Arama yapma
router.get('/api/search', async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  try {
    const searchResults = await SocialMedia.paginate(
      {
        $or: [
          { SocialMediaName: { $regex: query, $options: 'i' } },
          { Description: { $regex: query, $options: 'i' } }
        ]
      },
      { page, limit }
    );
    res.json(searchResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Belirli bir sosyal medya bağlantısını güncelle
router.put('/api/update/:id',
  body('SocialMediaLink').optional().isURL().notEmpty(),
  body('SocialMediaName').optional().isString().notEmpty(),
  body('Description').optional().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const socialMedia = await SocialMedia.findById(req.params.id);
      if (!socialMedia) return res.status(404).json({ message: 'Sosyal medya bağlantısı bulunamadı' });

      if (req.body.SocialMediaLink != null) {
        socialMedia.SocialMediaLink = req.body.SocialMediaLink;
      }
      if (req.body.SocialMediaName != null) {
        socialMedia.SocialMediaName = req.body.SocialMediaName;
      }
      if (req.body.Description != null) {
        socialMedia.Description = req.body.Description;
      }

      const updatedSocialMedia = await socialMedia.save();
      res.json(updatedSocialMedia);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Belirli bir sosyal medya bağlantısını sil
router.delete('/api/delete/:id', async (req, res) => {
  try {
    const result = await SocialMedia.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Sosyal medya bağlantısı bulunamadı' });
    }
    res.json({ message: 'Sosyal medya bağlantısı silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;