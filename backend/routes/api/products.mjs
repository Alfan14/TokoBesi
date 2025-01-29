import express from "express";
import { getDatabase } from "../../db/conn.mjs";
import { ObjectId } from "mongodb";
import Product from '../../models/Products.mjs';
import authenticateJWT from '../../middleware/authenticationJWT.mjs';
import rbacMiddleware from '../../middleware/rbacMiddleware.mjs';

const router = express.Router();

// @route GET /products
// @desc Get ALL products
router.get('/', authenticateJWT ,  async (req, res, next) => await rbacMiddleware.checkPermission('read_record')(req, res, next) , async (req, res, next) => {
      // Fetch all products from the database
      const db = await getDatabase();
      let collection = await db.collection("posts");
      let results = await collection.find({})
        .limit(50)
        .toArray();
    
      res.send(results).status(200);
  });

// Get a single post
router.get("/:id",authenticateJWT , async (req, res, next) => await rbacMiddleware.checkPermission('read_record')(req, res, next) , async (req, res) => {
  try {
    const db = await getDatabase();
    const collection = db.collection("posts");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
        res.status(404).send("Post not found");
    } else {
        res.status(200).send(result);
    }
    } catch (error) {
        res.status(400).send("Invalid ID format");
    }
  });

  // Adding new Products
  router.post("/",authenticateJWT , async (req, res, next) => await rbacMiddleware.checkPermission('create_record')(req, res, next) ,
  async (req, res) => {
    try {
        const db = await getDatabase();
        const collection = db.collection("posts");
        let newProduct = req.body;
        newProduct.date = new Date();

        let result = await collection.insertOne(newProduct);

        res.status(201).send(result);
    } catch (err) {
        console.error("POST route error:", err);
        res.status(500).send("Uh oh! An unexpected error occurred.");
    }
});

// @route PUT api/products/:id
// @desc  Update a product
router.patch("/:id",authenticateJWT , async (req, res, next) => await rbacMiddleware.checkPermission('update_record')(req, res, next) , 
async (req, res) => {
  try {
    const db = await getDatabase();
    const collection = db.collection("posts");

    const query = { _id: new ObjectId(req.params.id) };
    const updates = { $set: req.body }; // Use $set for general updates
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
        res.status(404).send("Post not found");
    } else {
        res.status(200).send(result);
    }
    } catch (error) {
        res.status(400).send("Invalid ID format");
    }
});

// @route DELETE api/products/:id
// @desc  Delete a product
router.delete("/:id",authenticateJWT , async (req, res, next) => await rbacMiddleware.checkPermission('delete_record')(req, res, next) , async (req, res) => {
  try {
        const db = await getDatabase();
        const collection = db.collection("posts");

        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            res.status(404).send("Post not found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(400).send("Invalid ID format");
    }
});

export default router;