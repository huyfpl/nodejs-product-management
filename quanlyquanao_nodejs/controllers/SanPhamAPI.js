module.exports.get_list_api = (req, res) => {
  console.log(req+"huy")
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
  