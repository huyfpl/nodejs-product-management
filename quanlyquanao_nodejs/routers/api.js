
const sanpham_api = require('../controllers/SanPhamAPI');
const express=require('express');
const router= express.Router();


router.get('/listsanpham', sanpham_api.get_list_api_sanpham);
router.get('/listuser', sanpham_api.get_list_api_user);
router.post('/register-user', sanpham_api.post_list_api_user);
router.get('/danhmuc', sanpham_api.get_list_api_danhmuc);
router.get('/listsanpham-danhmuc/:id', sanpham_api.get_list_api_sanpham_id_danhmuc);
router.get('/listuser-id/:id', sanpham_api.get_list_api_user_id);
router.post('/updateuser-id/:id', sanpham_api.edit_capnhat_user);
router.get('/giohang/:id', sanpham_api.get_list_api_giohang);
router.post('/addgiohang/:id/:idSP', sanpham_api.add_to_giohang);
router.post('/tangsoluonggiohang/:id/:idSP', sanpham_api.tang_so_luong_giohang);
router.post('/giamsoluonggiohang/:id/:idSP', sanpham_api.giam_so_luong_giohang);

module.exports = router;
