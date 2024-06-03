import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import index from './routes/index.js';
import rewards from './routes/rewards.js';
import webPush from 'web-push';
import connectDB from './db.js';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDB(app);

const publicVapidKey = 'BGEXO0Zioaer20768ak8fN-H_yhIJmelnyBJSAC0JnNLjEHLL_r3hrZSHecGeFOBjK94m9fS3C1qjmIR8x9t7UU';
const privateVapidKey = 'EvY0sgO3DtLWjaDjOVcYY1WPKzPB9w3_Fgfz2XlVLp0';

webPush.setVapidDetails('mailto:vibhuti.aggarwal@geminisolutions.com', publicVapidKey, privateVapidKey);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  console.log('Backend subscribed')
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    // notification: {
      title: 'New Notification',
      body: 'This is a push notification',
      icon: 'icon.png',
    // },
  };

  const promises = subscriptions.map(sub => 
    webPush.sendNotification(sub, JSON.stringify(notificationPayload))
  );

  Promise.all(promises)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error('Error sending notification:', err);
      res.sendStatus(500);
    });
});

app.use('/api/users', userRoutes);
app.use('/', index);
app.use('/api', rewards);
