module.exports.get_list_api_sanpham = (req, res) => {
  console.log(req + "huy")
  req.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    } else {
      conn.query('SELECT * FROM products', (err, products) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ products: products });
        }
      });
    }
  });
};
module.exports.get_list_api_user = (req, res) => {
  console.log(req + "huy")
  req.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    } else {
      conn.query('SELECT tentaikhoan,pass FROM users', (err, users) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ products: users });
        }
      });
    }
  });
};
//bat dau code moi//

module.exports.post_list_api_user = (req, res) => {
  const { tentaikhoan, pass, ten, dia_chi, sdt, avatar } = req.body;
  const data = { tentaikhoan, pass, ten, dia_chi, sdt, avatar };
  req.getConnection((err, conn) => {
    const query = conn.query('INSERT INTO users SET ?', data, (err, user) => {
      if (err) {
        res.json(err);
      } else {
        console.log(user);
        console.log(data);
        res.json({ message: 'User registered successfully' });
      }
    });
  });
};

//ketthuccode moi//
/////da comment/
// module.exports.post_list_api_user = (req, res) => {
//   const {tentaikhoan,pass, ten} = req.body;
//   const data = { tentaikhoan, pass}; 
//   req.getConnection((err, conn) => {
//     const query = conn.query('INSERT INTO users SET ?', data, (err, user) => {
//       if (err) {
//         res.json(err);
//       }
//       console.log(user);
//       console.log(data);
//     });
//   });
// };
//oke
