import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import Product from '../../models/Products.mjs';


const router = express.Router();

// @route GET /products
// @desc Get ALL products
router.get('/', (req,res)=>{
    // Fetch all products from database
    Product.find({}, (error, products)=>{
        if (error) console.log(error)
        res.json(products)
    })
})

// Get a list of 50 posts
router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({})
      .limit(50)
      .toArray();
  
    res.send(results).status(200);
  });

// @route PUT api/products/:id
// @desc  Update a product
router.put('/:id', (req,res)=>{
    // Update a product in the database
    Product.updateOne({_id:req.params.id},{
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        photo:req.body.photo
    }, {upsert: true}, (err)=>{
        if(err) console.log(err);
        res.json({success:true})
    })
})

// @route DELETE api/products/:id
// @desc  Delete a product
router.delete('/:id', (req,res)=>{
    // Delete a product from database
    Product.deleteOne({_id: req.params.id}, (err)=>{
        if (err){
            console.log(err)
            res.json({success:false})
        }else{
            res.json({success:true})
        }
    })
})

module.exports = router