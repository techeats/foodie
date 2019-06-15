const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => res.render('index'));

router.get('/vendor/register', (req, res) => res.render('registerVendor'));

router.get('/register', (req, res) => res.render('auth'));

router.get('/login', (req, res) => res.render('auth'));

router.get('/menu', (req, res) => res.render('menu'));

router.get('/services', (req, res) => res.render('services'));

router.get('/contact', (req, res) => res.render('contact'));

router.get('/gallery', (req, res) => res.render('gallery'));

router.get('/gallery/detail', (req, res) => res.render('galleryDetail'));

router.get('/user/profile', (req, res) => res.render('userProfile'));

router.get('/how-it-works', (req, res) => res.render('howItWorks'));

module.exports = router;
