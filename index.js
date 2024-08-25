require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const socialMediaRoutes = require('./routes/socialMediaRoutes');
const socialMediaTypeRoutes = require('./routes/socialMediaTypeRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB\'ye başarıyla bağlanıldı');
    })
    .catch((err) => {
        console.error('MongoDB bağlantı hatası:', err);
    });

// Rotalar
app.use('/socialmedia', socialMediaRoutes);
app.use('/socialmediatype', socialMediaTypeRoutes);

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});