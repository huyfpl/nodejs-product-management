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
// lấy all danh sách user
module.exports.get_list_api_user = (req, res) => {
  console.log(req + "huy")
  req.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    } else {
      conn.query('SELECT id,tentaikhoan,pass FROM users', (err, users) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ products: users });
        }
      });
    }
  });
};
// lấy danh sách user theo id
module.exports.get_list_api_user_id = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    conn.query("SELECT * FROM users WHERE id = ?", [id], (err, users) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ products: users });
      }
    });
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
// danh sách danh mục 
module.exports.get_list_api_danhmuc = (req, res) => {
 
  req.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    } else {
      conn.query('SELECT * FROM danhmuc', (err, danhmuc) => {
        if (err) {
          res.json(err);
        } else {
          res.json({ danhmuc: danhmuc });
        }
      });
    }
  });
};
// lấy danh sách theo danh mục
module.exports.get_list_api_sanpham_id_danhmuc = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    conn.query("SELECT * FROM products WHERE id_danhmuc = ?", [id], (err, products) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ products: products });
      }
    });
  });
};
