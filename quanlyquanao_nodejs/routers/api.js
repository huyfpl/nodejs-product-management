
const sanpham_api = require('../controllers/SanPhamAPI');
const express=require('express');
const router= express.Router();


router.get('/listsanpham', sanpham_api.get_list_api_sanpham);
router.get('/listuser', sanpham_api.get_list_api_user);
router.post('/register-user', sanpham_api.post_list_api_user);

module.exports = router;
