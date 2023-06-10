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
module.exports.post_list_api_user = (req, res) => {
  const {tentaikhoan,pass} = req.body;
  const data = { tentaikhoan, pass }; 
  req.getConnection((err, conn) => {
    const query = conn.query('INSERT INTO users SET ?', data, (err, user) => {
      if (err) {
        res.json(err);
      }
      console.log(user);
      console.log(data);
    });
  });
};
//oke
