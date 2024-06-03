import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, image } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
    const newUser = await User.findOne({username: username}).lean();
    console.log('new user', newUser);
    if(!newUser) {
      console.log('create');
      const data = await User.findOneAndUpdate({username}, {username, password:hashedPassword,image}, {new: true, upsert: true});
      console.log(data);
      res.status(200).send({msg: 'User created', data });
    } else {
      res.status(401).send('Username Already Exist!');
    }
  }catch(e){
    res.status(400).send(e);
  }
 
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.status(200).send({msg: 'Logged in successfully!', data: { ...user, token }});
  } else {
    res.status(401).send('Invalid credentials');
  }
});

export default router;
