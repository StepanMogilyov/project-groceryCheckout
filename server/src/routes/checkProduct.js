const router = require('express').Router();
const { Product } = require('../../db/models');

router.post('/', async (req, res) => {  
  const { productArticle } = req.body;
  const product = await Product.findOne({ where: { article: productArticle }, raw: true });
  console.log('product: ', product);
  // res.json(product)
});

module.exports = router;
