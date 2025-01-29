import express from "express";
import { getDatabase } from "../../db/conn.mjs";
import { ObjectId } from "mongodb";
import jwt        from 'jsonwebtoken';
import bcrypt     from 'bcryptjs';
import authenticateJWT from '../../middleware/authenticationJWT.mjs'

const router = express.Router();

// Secret Key
const SECRET_KEY = process.env.SECRET_KEY;

// Login Page
router.post('/login', async(req, res) => {
    try {
        const db = await getDatabase();
        let collection = await db.collection("users");

        const { username, password , role} = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await collection.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, username: user.username , role :user.role}, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error during signin:', err);
        res.status(500).send('Error while processing the request');
    }
  });

// Sign Up
router.post('/signup', async(req, res) => {
    try{
        const db = await getDatabase();
        let collection = await db.collection("users");

        const { username, password , role } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = { id: collection.length + 1, username, password: hashedPassword , role };

        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const result = await collection.insertOne(newUser);

        if (result.insertedId) {
            const token = jwt.sign({ id: result.insertedId, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(500).send('Error creating user');
        }
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).send('Error while processing the request');
    }

});
// Getting users
router.get('/me', authenticateJWT ,async(req, res) => {
    try {
        const db = await getDatabase();
        let collection = await db.collection("users");

        const userId = req.user?.id; 
        if (!userId) {
            return res.status(40).send('Unauthorized');
        }

        const user = await collection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);

    } catch (err) {
        console.error('Error during signin:', err);
        res.status(500).send('Error while processing the request');
    }
  });


export default router;