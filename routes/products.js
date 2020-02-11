const express = require('express');
const router = express.Router();

//Product Model
const Product = require('../model/Product');

// GET api/products
//     get all products
router.get('/', (req, res) => {
    Product.find().sort({date: -1})
        .then(products => res.json(products))
});

// Post api/products
//      Create a product
router.post('/', (req, res) => {
   const newProduct = new Product({
       name:req.body.name,
       price:req.body.price
   });
   newProduct.save()
       .then(product => res.json(product));

});

// DELETE api/products/:id
//        Delete a product
router.delete('/:id', (req, res) =>{
    Product.findById(req.params.id)
        .then(product => product.remove()
            .then( ()=> res.json({success: true})))
        .catch(error => res.status(404).json({success:false}))
});

module.exports = router;
