const express = require('express');
const {engine}=require('express-handlebars');
const bodyParser = require('body-parser');
const Router = require('./routers/router');
let path = require('path');
let mysql = require('mysql');
let myConnection = require('express-myconnection');
let morgan = require('morgan');
const app = express();
const apiSanPham =require('./routers/api')
const Handlebars = require('handlebars');
const handlebarsHelpers = require('handlebars-helpers');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.engine('hbs', engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views',"./views");
// Kết nối
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'sql.freedb.tech',
    user: 'freedb_sanpham_test',
    password: '7wZ$Dm%739HV4hr',
    port: 3306,
    database: 'freedb_test_sanpham'
    ,
    connectTimeout:100000
}, 'single'));
Handlebars.registerHelper('isEqual', handlebarsHelpers.comparison().eq);

app.use(Router);
app.use('/api',apiSanPham)
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Khởi động server
app.listen(app.get('port'), '192.168.0.105', () => {
    console.log(`Server đang khởi động ở host ${app.get('port')}`);
  });
