
const sanpham_api = require('../controllers/SanPhamAPI');
const express=require('express');
const router= express.Router();


router.get('/listsanpham', sanpham_api.get_list_api);

module.exports = router;
