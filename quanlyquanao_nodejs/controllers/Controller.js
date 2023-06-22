// Dinh nghia cac ham
let controller = {};

// 1. Ham doc du lieu (select)
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT products.*, sale.phantramgiamgia,sale.anhsale\
    FROM products\
    LEFT JOIN sale ON products.idSP = sale.idSP', (err, products) => {
      if (err) {
        res.json(err);
      }
      res.render('quanlysanpham/home', { data: products });
    });
  });
};
controller.add_get=(req,res) => {
  res.render('quanlysanpham/add', { Title: 'Thêm sản phẩm' })
}
// 2. Ham luu du lieu (insert)
controller.add_post = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    const query = conn.query('INSERT INTO products SET ?', data, (err, product) => {
      if (err) {
        res.json(err);
      }
      console.log(product);
      console.log(data);
      res.redirect('/');
    });
  });
};
controller.edit_get = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    conn.query("SELECT products.*, danhmuc.ten_danhmuc \
    FROM products \
    INNER JOIN danhmuc ON products.id_danhmuc = danhmuc.id_danhmuc \
    WHERE products.idSP = ?", [id], (err, rows) => {
      if (err) throw err;
      conn.query("SELECT * FROM danhmuc", (err, danhmuc) => {
        if (err) throw err;
        res.render('quanlysanpham/edit', { object: rows[0], data:danhmuc });
      });
    });
  });
};

  controller.edit_post = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    console.log(id);
    req.getConnection((err, conn) => {
      conn.query('UPDATE products SET ? WHERE idSP=?', [newProduct, id], (err, rows) => {
        res.redirect('/');
      });
    });
  };
  
  controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      conn.query('DELETE FROM giohang WHERE idSP = ?', [id], (err, giohangResult) => {
        if (err) {
       
          console.log(err);
          res.redirect('/');
        }
        conn.query('DELETE FROM products WHERE idSP = ?', [id], (err, productsResult) => {
          if (err) {
         
            console.log(err);
            res.redirect('/');
          }
          if (productsResult.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
          }
          res.redirect('/');
        });
      });
    });
  };
  controller.search = (req, res) => {
    const { name } = req.query;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM products WHERE tenSP LIKE ?', `%${name}%`, (err, products) => {
        if (err) {
          res.json(err);
        }
        res.render('quanlysanpham/home', { data: products });
      });
    });
  };
  


//user

controller.list_user = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users', (err, users) => {
      if (err) {
        res.json(err);
      }
      res.render('quanlyuser/home_user', { data: users });
    });
  });
};
controller.add_get_user=(req,res) => {
  res.render('quanlyuser/add_user', { Title: 'Thêm sản phẩm' })
}
// 2. Ham luu du lieu (insert)
controller.add_post_user = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    const query = conn.query('INSERT INTO users SET ?', data, (err, user) => {
      if (err) {
        res.json(err);
      }
      console.log(user);
      console.log(data);
      res.redirect('/users');
    });
  });
};
controller.edit_get_user = (req, res) => {
    const { id } = req.params;
   
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM users WHERE id=?", [id], (err, rows) => {
        res.render('quanlyuser/edit_user', { object: rows[0] });
      });
    });
  };
  
  controller.edit_post_user = (req, res) => {
    const { id } = req.params;
    const newuser = req.body;
    console.log(id);
    req.getConnection((err, conn) => {
      conn.query('UPDATE users SET ? WHERE id=?', [newuser, id], (err, rows) => {
        res.redirect('/users');
      });
    });
  };
  
  controller.delete_user = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM users WHERE id = ?', [id], (err, rows) => {
        res.redirect('/users');
      });
    });
  };
  controller.search_user = (req, res) => {
    const { ten } = req.query;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM users WHERE ten LIKE ?', `%${ten}%`, (err, users) => {
        if (err) {
          res.json(err);
        }
        res.render('quanlyuser/home_user', { data: users });
      });
    });
  };
  


  
module.exports = controller;
