const express = require('express');
const { handleGenerateNewShortURL, handleRedirectNewShortURL, handleAnalytics, handleDeleteUrl } =  require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateNewShortURL)
router.get('/:id', handleRedirectNewShortURL)
router.get('/analytics/:id', handleAnalytics)
router.delete('/:id', handleDeleteUrl)

module.exports = router;