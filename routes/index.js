import policyForm from './policyForm.js';
import express from 'express';

const routers = express.Router();

// module.exports = function(app) {
//   require('./userRoutes')(app);

  const defaultRoutes = [
    {
      path: '/policy',
      route: policyForm,
    },
  ];

  defaultRoutes.forEach((route) => {
    routers.use(route.path, route.route);
  });
// }

export default routers;