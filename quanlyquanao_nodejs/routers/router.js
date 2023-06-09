//dinh nghia cac thao tac co the co
const Controller = require('../controllers/Controller');
const express=require('express');
const router= express.Router();
//sapham
router.get('/',Controller.list);
router.get('/add',Controller.add_get);
router.post('/add',Controller.add_post);
router.get('/edit/:id', Controller.edit_get);
router.post('/edit/:id', Controller.edit_post);
router.get('/delete/:id',Controller.delete);
router.get('/search',Controller.search);
//user
router.get('/users',Controller.list_user);
router.get('/add_user',Controller.add_get_user);
router.post('/add_user',Controller.add_post_user);
router.get('/edit_user/:id', Controller.edit_get_user);
router.post('/edit_user/:id', Controller.edit_post_user);
router.get('/delete_user/:id',Controller.delete_user);
router.get('/search_user',Controller.search_user);
module.exports = router;