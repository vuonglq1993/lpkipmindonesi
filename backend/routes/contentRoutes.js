const express = require('express');
const router = express.Router();
const { getContent } = require('../controllers/contentController');

router.get('/home', getContent);

module.exports = router;
