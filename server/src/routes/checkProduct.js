const router = require('express').Router();
const { Product } = require('../../db/models');

router.post('/', async (req, res) => {  
  console.log(222222);
  const { productArticle } = req.body;
  const product = await Product.findOne({ where: { article: productArticle }, raw: true });
  res.json(product)
});

module.exports = router;
