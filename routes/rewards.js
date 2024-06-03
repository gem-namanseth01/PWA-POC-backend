import express from 'express';
import policyForm from '../models/policyForm.js';
const app = express();


// Define the route to fetch rewards
app.get('/rewards', async (req, res) => {
  console.log('rewards');
  try {
    policyForm.aggregate([
      {
          $group: {
              _id: "$username",
              points: { $sum: 1 }
          }
      },
      {
          $project: {
              _id: 0,
              name: "$_id",
              points: 1
          }
      }
  ]).then(rewards => {
    console.log('rewards-----',rewards);
    res.send(rewards);
  })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

export default app;
