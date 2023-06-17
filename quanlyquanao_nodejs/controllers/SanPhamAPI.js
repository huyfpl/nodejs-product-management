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

//
//cập nhật  user
module.exports.edit_capnhat_user = (req, res) => {
  const { id } = req.params;
  const newuser = req.body;
  console.log(id);
  req.getConnection((err, conn) => {
    conn.query('UPDATE users SET ? WHERE id=?', [newuser, id], (err, users) => {
      res.json({ products: users });
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
// lấy giỏ hàng theo id user
module.exports.get_list_api_giohang = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    const query = `
    SELECT products.tenSP,products.idSP, products.giaBan, products.anhSP, danhmuc.ten_danhmuc,giohang.soluong
    FROM giohang
    JOIN products ON giohang.idSP = products.idSP
    JOIN danhmuc ON products.id_danhmuc = danhmuc.id_danhmuc
    JOIN users ON giohang.id = users.id
    WHERE users.id = ?;
    `;
    conn.query(query, [id], (err, products) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ products: products });
      }
    });
  });
};
module.exports.add_to_giohang = (req, res) => {
  const { id, idSP } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    const checkQuery = `
    SELECT soluong
    FROM giohang
    WHERE id = ? AND idSP = ?;
    `;
    conn.query(checkQuery, [id, idSP], (err, results) => {
      if (err) {
        res.json(err);
      } else {
        if (results.length > 0) {
          const updateQuery = `
          UPDATE giohang
          SET soluong = soluong + 1
          WHERE id = ? AND idSP = ?;
          `;
          conn.query(updateQuery, [id, idSP], (err, updateResult) => {
            if (err) {
              res.json(err);
            } else {
              res.json({ message: 'Số lượng sản phẩm đã được tăng.' });
            }
          });
        } else {
          const insertQuery = `
          INSERT INTO giohang (id, idSP, soluong)
          VALUES (?, ?, 1);
          `;
          conn.query(insertQuery, [id, idSP], (err, insertResult) => {
            if (err) {
              res.json(err);
            } else {
              res.json({ message: 'Sản phẩm đã được thêm vào giỏ hàng.' });
            }
          });
        }
      }
    });
  });
};

// kiểm tra có trong giỏ hàng thì tăng số lượng
module.exports.tang_so_luong_giohang = (req, res) => {
  const { id, idSP } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    const updateQuery = `
      UPDATE giohang
      SET soluong = soluong + 1
      WHERE id = ? AND idSP = ?;
    `;
    conn.query(updateQuery, [id, idSP], (err, updateResult) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ message: 'Số lượng sản phẩm đã được tăng.' });
      }
    });
  });
};
module.exports.giam_so_luong_giohang = (req, res) => {
  const { id, idSP } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    const updateQuery = `
      UPDATE giohang
      SET soluong = soluong - 1
      WHERE id = ? AND idSP = ?;
    `;
    conn.query(updateQuery, [id, idSP], (err, updateResult) => {
      if (err) {
        res.json(err);
      } else {
        const checkQuery = `
          SELECT soluong
          FROM giohang
          WHERE id = ? AND idSP = ?;
        `;
        conn.query(checkQuery, [id, idSP], (err, checkResult) => {
          if (err) {
            res.json(err);
          } else {
            const soluong = checkResult[0].soluong;
            if (soluong === 0) {
              const deleteQuery = `
                DELETE FROM giohang
                WHERE id = ? AND idSP = ?;
              `;
              conn.query(deleteQuery, [id, idSP], (err, deleteResult) => {
                if (err) {
                  res.json(err);
                } else {
                  res.json({ message: 'Số lượng sản phẩm đã được giảm. Sản phẩm đã được xóa khỏi giỏ hàng.' });
                }
              });
            } else {
              res.json({ message: 'Số lượng sản phẩm đã được giảm.' });
            }
          }
        });
      }
    });
  });
};


